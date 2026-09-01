/**
 * app/api/ai/chat/route.ts
 *
 * Secure server-side API route for CensusAI chat.
 * The Gemini API key NEVER leaves this server context.
 *
 * POST /api/ai/chat
 */

import { NextRequest, NextResponse } from "next/server";
import { generateCensusAIResponse, CensusAIChatRequest } from "@/lib/gemini";

/** Maximum characters allowed in a single user message. */
const MAX_MESSAGE_LENGTH = 2000;

/** Maximum history entries accepted from the client. */
const MAX_HISTORY_LENGTH = 40;

export async function POST(request: NextRequest) {
  try {
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

    // 2. Validate required `message` field
    const message = payload.message;
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required and cannot be empty." },
        { status: 400 }
      );
    }

    // 3. Enforce message length limit
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Message is too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    // 4. Validate optional fields
    const language =
      typeof payload.language === "string" ? payload.language : undefined;
    const context =
      typeof payload.context === "string" ? payload.context : undefined;

    // 5. Validate and sanitize history
    let history: CensusAIChatRequest["history"] = [];
    if (Array.isArray(payload.history)) {
      const rawHistory = payload.history.slice(0, MAX_HISTORY_LENGTH);
      history = rawHistory
        .filter(
          (item): item is { role: "user" | "assistant"; content: string } =>
            item !== null &&
            typeof item === "object" &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.content === "string" &&
            item.content.trim().length > 0
        )
        .map((item) => ({
          role: item.role,
          content: item.content.slice(0, MAX_MESSAGE_LENGTH), // cap each history message too
        }));
    }

    // 6. Call Gemini (server-side)
    const result = await generateCensusAIResponse({
      message: message.trim(),
      language,
      context,
      history,
    });

    return NextResponse.json(
      { success: true, message: result.text },
      { status: 200 }
    );
  } catch (error: unknown) {
    // 7. Server-side error logging (never expose internals to client)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.error("[CensusAI API Error]", errorMessage);

    // Friendly client-facing messages based on error type
    if (errorMessage.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "CensusAI is not yet configured. Please add your GEMINI_API_KEY to .env.local and restart the server.",
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
          error:
            "CensusAI is experiencing high demand. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Sorry, CensusAI is temporarily unavailable. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
