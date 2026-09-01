/**
 * lib/gemini.ts — Server-side only Gemini client utility.
 *
 * ⚠️  NEVER import this file from a "use client" component.
 *      It must only run in server-side code (API routes, Server Components).
 *
 * Uses @google/genai SDK.
 */

import { GoogleGenAI, Content } from "@google/genai";
import {
  CENSUSAI_SYSTEM_INSTRUCTION,
  buildContextPrefix,
  buildLanguageInstruction,
} from "@/lib/prompts";

/** Lazily initialized to avoid double-init in serverless environments. */
let _client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Please add it to your .env.local file.");
  }
  if (!_client) {
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

/** The Gemini model to use, read from env with a sensible default. */
function getModelName(): string {
  return process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
}

export interface GeminiChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface CensusAIChatRequest {
  message: string;
  language?: string;
  context?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface CensusAIChatResult {
  text: string;
}

/**
 * Main function: sends a message to Gemini with census context.
 * Runs server-side only.
 */
export async function generateCensusAIResponse(
  req: CensusAIChatRequest
): Promise<CensusAIChatResult> {
  const client = getClient();
  const modelName = getModelName();

  // Build full system instruction with optional language suffix
  const systemInstruction =
    CENSUSAI_SYSTEM_INSTRUCTION +
    buildLanguageInstruction(req.language);

  // Build contextual user prefix if page context is provided
  const contextPrefix = buildContextPrefix(req.context);

  // Transform conversation history → Gemini SDK Content[] format
  // Limit to the last 10 exchanges (20 messages) to avoid bloating the request
  const recentHistory = (req.history ?? []).slice(-20);
  const geminiHistory: Content[] = recentHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  // Final user message (optionally prefixed with current page context)
  const userMessage = contextPrefix + req.message;

  const response = await client.models.generateContent({
    model: modelName,
    contents: [
      ...geminiHistory,
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ],
    config: {
      systemInstruction: systemInstruction,
    },
  });

  const text = response.text ?? "";
  if (!text.trim()) {
    throw new Error("Empty response received from Gemini.");
  }

  return { text };
}
