export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  suggestedActions?: {
    label: string;
    actionType: "link" | "query";
    target: string;
  }[];
}

export interface SuggestedPrompt {
  id: string;
  text: string;
  category: "phase1" | "phase2" | "self_enumeration" | "general" | "privacy";
}
