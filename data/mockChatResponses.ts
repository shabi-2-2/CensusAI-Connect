/**
 * data/mockChatResponses.ts
 *
 * Retained for SUGGESTED_PROMPTS used in the chat panel quick-action bar.
 * The mock keyword-matching knowledge base has been removed in Phase 2 —
 * all responses now come from the real Gemini API via /api/ai/chat.
 *
 * NOTE: If GEMINI_API_KEY is not set, the API route returns a friendly
 * error message rather than crashing. No fallback mock is used by default.
 */

import { SuggestedPrompt } from "@/types/chat";

/** Context-aware suggested prompts shown in the quick-action bar. */
export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: "p1",
    text: "What is Phase 1 (Houselisting)?",
    category: "phase1",
  },
  {
    id: "p2",
    text: "What questions are asked in Phase 2?",
    category: "phase2",
  },
  {
    id: "p3",
    text: "How does online self-enumeration work?",
    category: "self_enumeration",
  },
  {
    id: "p4",
    text: "Is my personal data kept confidential?",
    category: "privacy",
  },
  {
    id: "p5",
    text: "What documents do I need to show?",
    category: "general",
  },
  {
    id: "p6",
    text: "What if I miss the self-enumeration deadline?",
    category: "self_enumeration",
  },
];

/** Page-specific contextual suggestions shown when AI is opened from a specific section. */
export const PAGE_SUGGESTIONS: Record<string, SuggestedPrompt[]> = {
  home: [
    { id: "home-1", text: "What is the census?", category: "general" },
    { id: "home-2", text: "How does self-enumeration work?", category: "self_enumeration" },
    { id: "home-3", text: "Why is census data collected?", category: "general" },
  ],
  phase1: [
    { id: "ph1-1", text: "What information is collected in Phase 1?", category: "phase1" },
    { id: "ph1-2", text: "Why are housing details needed?", category: "phase1" },
    { id: "ph1-3", text: "What does Pucca vs Kutcha house mean?", category: "phase1" },
  ],
  phase2: [
    { id: "ph2-1", text: "What information is collected in Phase 2?", category: "phase2" },
    { id: "ph2-2", text: "Why is occupation information needed?", category: "phase2" },
    { id: "ph2-3", text: "Does census ask about caste or religion?", category: "phase2" },
  ],
  schedule: [
    { id: "sch-1", text: "When does self-enumeration open in my state?", category: "general" },
    { id: "sch-2", text: "What happens if I miss the deadline?", category: "self_enumeration" },
  ],
  mythbuster: [
    { id: "myt-1", text: "Does census share data with Income Tax?", category: "privacy" },
    { id: "myt-2", text: "Do I need to show Aadhaar for census?", category: "general" },
  ],
  "data-insights": [
    { id: "ins-1", text: "Which state has the highest literacy rate?", category: "general" },
    { id: "ins-2", text: "How is population growth measured?", category: "general" },
  ],
};
