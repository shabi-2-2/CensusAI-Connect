/**
 * app/api/ai/schedule-query/route.ts
 *
 * API endpoint to parse natural language schedule queries using Gemini.
 * Extracts intent & location ONLY. Gemini never generates census dates.
 *
 * POST /api/ai/schedule-query
 */

import { NextRequest, NextResponse } from "next/server";
import { generateScheduleExtraction } from "@/lib/gemini";
import { ScheduleExtractionResult, ScheduleQueryIntent } from "@/types/schedule";

const MAX_QUERY_LENGTH = 500;

const VALID_INTENTS: ScheduleQueryIntent[] = [
  "phase1_dates",
  "phase2_dates",
  "self_enumeration_date",
  "schedule_overview",
  "missed_deadline",
  "general_schedule_question",
];

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

    if (query.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Query is too long (max ${MAX_QUERY_LENGTH} characters).` },
        { status: 400 }
      );
    }

    const rawJsonString = await generateScheduleExtraction(query.trim());

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawJsonString);
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to parse structured response from Gemini." },
        { status: 500 }
      );
    }

    const rawIntent = typeof parsed.intent === "string" ? parsed.intent : "general_schedule_question";
    const intent: ScheduleQueryIntent = VALID_INTENTS.includes(rawIntent as ScheduleQueryIntent)
      ? (rawIntent as ScheduleQueryIntent)
      : "general_schedule_question";

    const location = typeof parsed.location === "string" && parsed.location.trim() ? parsed.location.trim() : null;
    const state = typeof parsed.state === "string" && parsed.state.trim() ? parsed.state.trim() : null;
    const confidence = parsed.confidence === "high" || parsed.confidence === "medium" || parsed.confidence === "low"
      ? parsed.confidence
      : "high";

    const result: ScheduleExtractionResult = {
      intent,
      location,
      state,
      confidence,
    };

    return NextResponse.json({ success: true, extraction: result }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Schedule AI Query Error]", errorMessage);

    return NextResponse.json(
      { success: false, error: "AI processing failed. Falling back to deterministic search." },
      { status: 500 }
    );
  }
}
