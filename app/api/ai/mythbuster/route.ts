/**
 * app/api/ai/mythbuster/route.ts
 *
 * Secure server-side API route for Myth Interpretation & Multilingual Response.
 *
 * STEP 1: Grounding — Find grounded myth from mythsData.ts (via direct keyword match or Gemini concept search).
 * STEP 2: Language Detection & Normalization.
 * STEP 3: Grounded Translation — Translate ONLY the grounded myth content from mythsData.ts into target language.
 * STEP 4: Return Unified Response.
 *
 * POST /api/ai/mythbuster
 */

import { NextRequest, NextResponse } from "next/server";
import { generateMythInterpretation, generateMythTranslation } from "@/lib/gemini";
import { searchMyths } from "@/data/mythsData";
import { MythInterpretationResponse, MythEntry } from "@/types/myth";

const MAX_QUERY_LENGTH = 500;

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;
    const query = payload.query;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { success: false, error: "Query is required." },
        { status: 400 }
      );
    }

    const rawQuery = query.trim();
    if (rawQuery.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Query is too long (max ${MAX_QUERY_LENGTH} characters).` },
        { status: 400 }
      );
    }

    // --- STEP 1: Grounding (Find grounded myth from mythsData.ts) ---
    let matchType: "deterministic" | "ai_assisted" = "deterministic";
    let groundedMyth: MythEntry | null = null;
    let originalLanguage = "English";
    let normalizedQuery = rawQuery;
    let extractedKeywords: string[] = [];
    let extractedCategory: string | undefined = undefined;
    let confidence = 0.9;
    let isCensusRelated = true;

    // Check direct local keyword match first
    const directMatches = searchMyths(rawQuery, "All");
    if (directMatches.length > 0) {
      groundedMyth = directMatches[0];
      matchType = "deterministic";
    }

    // Call Gemini Interpretation to get language detection & normalized keywords (runs for concept search or language detection)
    try {
      const interpJsonStr = await generateMythInterpretation(rawQuery);
      const parsedInterp = JSON.parse(interpJsonStr);

      if (typeof parsedInterp.originalLanguage === "string" && parsedInterp.originalLanguage.trim()) {
        originalLanguage = parsedInterp.originalLanguage.trim();
      }
      if (typeof parsedInterp.normalizedQuery === "string" && parsedInterp.normalizedQuery.trim()) {
        normalizedQuery = parsedInterp.normalizedQuery.trim();
      }
      if (Array.isArray(parsedInterp.keywords)) {
        extractedKeywords = parsedInterp.keywords.filter((k: unknown): k is string => typeof k === "string");
      }
      if (typeof parsedInterp.category === "string") {
        extractedCategory = parsedInterp.category;
      }
      if (typeof parsedInterp.confidence === "number") {
        confidence = parsedInterp.confidence;
      }
      if (typeof parsedInterp.isCensusRelated === "boolean") {
        isCensusRelated = parsedInterp.isCensusRelated;
      }
    } catch (interpErr) {
      console.warn("[Mythbuster Interpretation Warning] Failed to interpret query context", interpErr);
    }

    // If no direct keyword match was found, use Gemini's extracted concepts to search mythsData.ts
    if (!groundedMyth && isCensusRelated) {
      matchType = "ai_assisted";

      // 1. Search using extracted keywords
      for (const kw of extractedKeywords) {
        const kwMatches = searchMyths(kw, "All");
        if (kwMatches.length > 0) {
          groundedMyth = kwMatches[0];
          break;
        }
      }

      // 2. Search using normalized English query text
      if (!groundedMyth && normalizedQuery) {
        const normMatches = searchMyths(normalizedQuery, "All");
        if (normMatches.length > 0) {
          groundedMyth = normMatches[0];
        }
      }

      // 3. Search using category
      if (!groundedMyth && extractedCategory) {
        const catMatches = searchMyths("", extractedCategory);
        if (catMatches.length > 0) {
          groundedMyth = catMatches[0];
        }
      }
    }

    // If query is unrelated (e.g. pizza recipe)
    if (!isCensusRelated) {
      const unrelatedPayload: MythInterpretationResponse = {
        query: rawQuery,
        isCensusRelated: false,
        matchFound: false,
        source: "ai_assisted",
        responseLanguage: originalLanguage,
        aiInterpretation: {
          originalLanguage,
          normalizedQuery,
          keywords: extractedKeywords,
          category: extractedCategory,
          confidence,
        },
        message: "We could not verify this claim using the current CensusAI Connect knowledge base.",
      };
      return NextResponse.json({ success: true, ...unrelatedPayload }, { status: 200 });
    }

    // --- STEP 2 & 3: Translation (Must run even for direct matches if non-English) ---
    const responseLanguage = originalLanguage || "English";
    let localizedMyth: MythInterpretationResponse["localizedMyth"] = null;
    let translationAttempted = false;
    let translationSucceeded = false;

    if (groundedMyth && responseLanguage.toLowerCase() !== "english") {
      translationAttempted = true;
      try {
        const translationJsonStr = await generateMythTranslation(
          {
            myth: groundedMyth.myth,
            verdict: groundedMyth.verdict,
            explanation: groundedMyth.explanation,
            safetyGuidance: groundedMyth.safetyGuidance,
          },
          responseLanguage
        );

        const parsedTrans = JSON.parse(translationJsonStr);
        if (parsedTrans && typeof parsedTrans.explanation === "string") {
          localizedMyth = {
            myth: typeof parsedTrans.myth === "string" ? parsedTrans.myth : groundedMyth.myth,
            verdict: groundedMyth.verdict, // Preserved strictly from mythsData.ts
            explanation: parsedTrans.explanation,
            safetyGuidance: typeof parsedTrans.safetyGuidance === "string" ? parsedTrans.safetyGuidance : groundedMyth.safetyGuidance,
          };
          translationSucceeded = true;
        }
      } catch (transErr) {
        console.warn("[Mythbuster Translation Warning] Failed to translate grounded myth", transErr);
        translationSucceeded = false;
        localizedMyth = null; // Fallback to grounded English content
      }
    }

    // Temporary debug log
    console.log({
      query: rawQuery,
      detectedLanguage: responseLanguage,
      matchType,
      groundedResultFound: Boolean(groundedMyth),
      translationAttempted,
      translationSucceeded,
    });

    // --- STEP 4: Return Response ---
    if (groundedMyth) {
      const responsePayload: MythInterpretationResponse = {
        query: rawQuery,
        isCensusRelated: true,
        matchFound: true,
        source: matchType,
        responseLanguage,
        aiInterpretation: {
          originalLanguage,
          normalizedQuery,
          keywords: extractedKeywords,
          category: extractedCategory,
          confidence,
        },
        matchedMyth: groundedMyth,
        localizedMyth,
      };
      return NextResponse.json({ success: true, ...responsePayload }, { status: 200 });
    }

    // Unverified / No match in mythsData.ts
    const unverifiedPayload: MythInterpretationResponse = {
      query: rawQuery,
      isCensusRelated: true,
      matchFound: false,
      source: matchType,
      responseLanguage,
      aiInterpretation: {
        originalLanguage,
        normalizedQuery,
        keywords: extractedKeywords,
        category: extractedCategory,
        confidence,
      },
      message: "We could not verify this claim using the current CensusAI Connect knowledge base.",
    };

    return NextResponse.json({ success: true, ...unverifiedPayload }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Mythbuster API Error]", errorMessage);

    return NextResponse.json(
      { success: false, error: "AI myth interpretation failed." },
      { status: 500 }
    );
  }
}
