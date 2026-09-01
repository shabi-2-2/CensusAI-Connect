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

