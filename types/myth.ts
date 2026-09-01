export type VerdictType = "false" | "misleading" | "needs_verification";

export type MythCategory = "privacy" | "fraud" | "data" | "enumeration" | "eligibility";

export interface MythEntry {
  id: string;
  myth: string;
  verdict: VerdictType;
  explanation: string;
  safetyGuidance?: string;
  category: MythCategory;
  keywords: string[];
  sourceLabel: string;
}

// Backward compatibility alias for any existing imports
export type MythItem = MythEntry;

export interface MythInterpretationResponse {
  query: string;
  isCensusRelated: boolean;
  matchFound: boolean;
  source: "deterministic" | "ai_assisted" | "unverified";
  aiInterpretation?: {
    originalLanguage?: string;
    normalizedQuery?: string;
    keywords?: string[];
    category?: string;
    confidence?: number;
  };
  matchedMyth?: MythEntry | null;
  responseLanguage?: string;
  localizedMyth?: {
    myth: string;
    verdict: VerdictType;
    explanation: string;
    safetyGuidance?: string;
  } | null;
  message?: string;
}




