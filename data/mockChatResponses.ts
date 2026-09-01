import { SuggestedPrompt } from "@/types/chat";

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

export interface KeywordMockResponse {
  keywords: string[];
  response: string;
  suggestedActions?: {
    label: string;
    actionType: "link" | "query";
    target: string;
  }[];
}

export const MOCK_KNOWLEDGE_BASE: KeywordMockResponse[] = [
  {
    keywords: ["phase 1", "phase1", "houselisting", "housing census", "amenities"],
    response:
      "**Phase 1: Houselisting & Housing Census** focuses on mapping every dwelling and living condition across India.\n\nKey areas covered include:\n• Housing conditions & building materials\n• Drinking water availability and lighting source\n• Sanitation & latrine facilities\n• Kitchen & cooking fuel type (LPG/PNG)\n• Household amenities (internet, vehicles, TV)\n\nThis phase contains approximately 31 questions and takes about 10–12 minutes to complete.",
    suggestedActions: [
      { label: "View About Census Page", actionType: "link", target: "/about" },
      { label: "Check State Schedule", actionType: "link", target: "/schedule" },
    ],
  },
  {
    keywords: ["phase 2", "phase2", "population enumeration", "demographics", "people", "caste", "language"],
    response:
      "**Phase 2: Population Enumeration** counts every individual living in India at the census reference moment.\n\nKey details gathered include:\n• Full name, relationship to head, age & sex\n• Mother tongue & secondary languages spoken\n• Highest educational attainment & literacy\n• Economic activity, occupation & industry\n• Migration history and place of last residence\n• Fertility & marital statistics\n\nThis phase contains 28 questions and takes about 15 minutes per household.",
    suggestedActions: [
      { label: "Compare Phase 1 & 2", actionType: "link", target: "/about#comparison" },
      { label: "Ask about Privacy", actionType: "query", target: "Is my personal data kept confidential?" },
    ],
  },
  {
    keywords: ["self-enumeration", "self enumeration", "online form", "portal", "mobile app", "how to fill"],
    response:
      "**Digital Self-Enumeration** lets you complete census details from home on your smartphone or computer in 5 easy steps:\n\n1. **Household Information**: Location, address, and structure type\n2. **Housing Amenities**: Water, electricity, sanitation, and clean fuel\n3. **Household Assets**: Internet, connectivity, and vehicles\n4. **Member Roster**: Basic head of household count\n5. **Review & QR Code**: Get an acknowledgment number and verification QR code.\n\nWhen the enumerator visits, simply share your acknowledgment QR code for instant confirmation!",
    suggestedActions: [
      { label: "Preview Self Enumeration", actionType: "link", target: "/self-enumeration" },
    ],
  },
  {
    keywords: ["privacy", "confidential", "security", "tax", "income tax", "safe", "leak"],
    response:
      "**Your privacy is protected by law under Section 15 of the Census Act, 1948.**\n\n🔒 **Key Guarantees:**\n• Individual census records cannot be inspected or shared with any agency (including Income Tax, police, or private entities).\n• Data cannot be produced as evidence in court.\n• Results are only published in aggregated, anonymized statistical formats.\n• Census never asks for bank account numbers, passwords, or OTPs.",
    suggestedActions: [
      { label: "Open Mythbuster", actionType: "link", target: "/mythbuster" },
    ],
  },
  {
    keywords: ["document", "documents", "aadhaar", "proof", "certificate", "id card"],
    response:
      "**No physical documents or certificates are required!**\n\nThe Census is completely based on **truthful self-declaration**. You do not need to show land deeds, birth certificates, utility bills, or citizenship cards to enumerators.",
    suggestedActions: [
      { label: "Verify on Mythbuster", actionType: "link", target: "/mythbuster" },
    ],
  },
  {
    keywords: ["schedule", "dates", "when", "state", "timeline", "deadline"],
    response:
      "Census schedules vary by State and Union Territory. In general:\n\n• **Phase 1 (Houselisting):** Rolling windows between April and September 2026.\n• **Phase 2 (Population):** Scheduled nationally in February 2027 (with earlier schedules for snowbound areas like Ladakh and Himachal).\n\nYou can select your state in our Schedule Checker for exact local dates.",
    suggestedActions: [
      { label: "Open Schedule Checker", actionType: "link", target: "/schedule" },
    ],
  },
  {
    keywords: ["language", "languages", "hindi", "tamil", "bengali", "telugu", "regional"],
    response:
      "CensusAI Connect supports **13+ Indian languages** including Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, and Assamese. You can switch your preferred language anytime using the language selector in the navigation bar.",
    suggestedActions: [
      { label: "Switch Language", actionType: "link", target: "#" },
    ],
  },
];

export const DEFAULT_AI_RESPONSE =
  "I am **CensusAI**, your intelligent census guide for India's digital census. I can help you understand Phase 1 & Phase 2, check schedules, clarify self-enumeration steps, or debunk common myths. What would you like to know?";
