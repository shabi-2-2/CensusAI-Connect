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
  EXTRACTION_SYSTEM_INSTRUCTION,
  SCHEDULE_EXTRACTION_SYSTEM_INSTRUCTION,
  MYTH_INTERPRETATION_SYSTEM_INSTRUCTION,
  MYTH_TRANSLATION_SYSTEM_INSTRUCTION,
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

/**
 * Extracts structured household data from natural language text.
 * Runs server-side only.
 */
export async function generateHouseholdExtraction(
  text: string,
  language?: string
): Promise<string> {
  const client = getClient();
  const modelName = getModelName();

  let instruction = EXTRACTION_SYSTEM_INSTRUCTION;
  if (language) {
    instruction += `\n\nNote: The user's input may be in ${language}. Handle it appropriately.`;
  }

  const response = await client.models.generateContent({
    model: modelName,
    contents: text,
    config: {
      systemInstruction: instruction,
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text ?? "";
  if (!responseText.trim()) {
    throw new Error("Empty response received from Gemini.");
  }

  return responseText;
}

/**
 * Extracts location and intent for schedule queries from natural language text.
 * Gemini NEVER generates census dates; it only extracts location & intent.
 * Runs server-side only.
 */
export async function generateScheduleExtraction(text: string): Promise<string> {
  const client = getClient();
  const modelName = getModelName();

  const response = await client.models.generateContent({
    model: modelName,
    contents: text,
    config: {
      systemInstruction: SCHEDULE_EXTRACTION_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text ?? "";
  if (!responseText.trim()) {
    throw new Error("Empty response received from Gemini.");
  }

  return responseText;
}

/**
 * Interprets user myth queries using Gemini to extract intent & keywords.
 * Gemini DOES NOT generate final verdicts; verdicts are pulled from mythsData.ts.
 * Runs server-side only.
 */
export async function generateMythInterpretation(text: string): Promise<string> {
  const client = getClient();
  const modelName = getModelName();

  const response = await client.models.generateContent({
    model: modelName,
    contents: text,
    config: {
      systemInstruction: MYTH_INTERPRETATION_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text ?? "";
  if (!responseText.trim()) {
    throw new Error("Empty response received from Gemini.");
  }

  return responseText;
}

/**
 * Translates and adapts an ALREADY GROUNDED myth entry into the target language.
 * Gemini DOES NOT invent facts or change verdicts.
 * Runs server-side only.
 */
export async function generateMythTranslation(
  groundedMythData: Record<string, unknown>,
  targetLanguage: string
): Promise<string> {
  const client = getClient();
  const modelName = getModelName();

  const userPrompt = `Target Language: ${targetLanguage}\n\nGrounded Myth Content to Translate:\n${JSON.stringify(groundedMythData, null, 2)}`;

  const response = await client.models.generateContent({
    model: modelName,
    contents: userPrompt,
    config: {
      systemInstruction: MYTH_TRANSLATION_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    },
  });

  const responseText = response.text ?? "";
  if (!responseText.trim()) {
    throw new Error("Empty translation response received from Gemini.");
  }

  return responseText;
}



