export type VerdictType = "false" | "partially_true" | "verified_true";

export interface MythItem {
  id: string;
  claim: string;
  category: "Privacy" | "Legal" | "Process" | "Eligibility" | "Documents";
  verdict: VerdictType;
  shortSummary: string;
  fullExplanation: string;
  keyTakeaway: string;
  sourceReference: string;
  tags: string[];
}
