/**
 * app/api/ai/extract-household/route.ts
 *
 * Secure server-side API route for CensusAI household extraction.
 *
 * POST /api/ai/extract-household
 */

import { NextRequest, NextResponse } from "next/server";
import { generateHouseholdExtraction } from "@/lib/gemini";
import { validateHouseholdExtraction, sanitizeInput } from "@/lib/validators";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

/** Maximum characters allowed in a single extraction input. */
const MAX_EXTRACTION_LENGTH = 1000;

export async function POST(request: NextRequest) {
  try {
    // 0. Rate limiting check
    const clientId = getClientIdentifier(request.headers);
    const rateLimit = checkRateLimit(clientId, { maxRequests: 25, windowMs: 60_000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many extraction requests. Please wait a few seconds before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimit.resetMs / 1000).toString(),
          },
        }
      );
    }

    // 1. Parse and validate request body
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

    // 2. Validate required `text` field
    const rawText = payload.text;
    if (!rawText || typeof rawText !== "string" || !rawText.trim()) {
      return NextResponse.json(
        { success: false, error: "Text is required and cannot be empty." },
        { status: 400 }
      );
    }

    const text = sanitizeInput(rawText, MAX_EXTRACTION_LENGTH);

    // 3. Enforce message length limit
    if (text.length > MAX_EXTRACTION_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Text is too long. Please keep it under ${MAX_EXTRACTION_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    // 4. Validate optional language field
    const language =
      typeof payload.language === "string" ? payload.language : undefined;

    // 5. Call Gemini (server-side)
    const rawResponse = await generateHouseholdExtraction(text.trim(), language);

    // 6. Parse JSON from Gemini safely
    let parsedJson: any;
    try {
      // Sometimes models wrap JSON in markdown blocks like ```json ... ```
      const cleanedRaw = rawResponse.replace(/```json/gi, "").replace(/```/g, "").trim();
      parsedJson = JSON.parse(cleanedRaw);
    } catch (parseError) {
      console.error("[Extraction Parsing Error]", parseError, rawResponse);
      return NextResponse.json(
        { success: false, error: "Failed to parse extraction results." },
        { status: 500 }
      );
    }

    // 7. Validate and sanitize extracted data
    const safeData = validateHouseholdExtraction(parsedJson);

    return NextResponse.json(
      { success: true, data: safeData },
      { status: 200 }
    );
  } catch (error: unknown) {
    // 8. Server-side error logging (never expose internals to client)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("[CensusAI Extraction Error]", errorMessage);

    // Friendly client-facing messages based on error type
    if (errorMessage.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        {
          success: false,
          error: "API is not yet configured. Please add your GEMINI_API_KEY.",
        },
        { status: 503 }
      );
    }

    if (
      errorMessage.includes("quota") ||
      errorMessage.includes("RESOURCE_EXHAUSTED")
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "The service is experiencing high demand. Please try again.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Sorry, the extraction service is temporarily unavailable.",
      },
      { status: 500 }
    );
  }
}
