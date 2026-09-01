import { ChatMessage } from "@/types/chat";
import { MOCK_KNOWLEDGE_BASE, DEFAULT_AI_RESPONSE } from "@/data/mockChatResponses";

/**
 * Generate AI Assistant response for a given user query.
 * In Phase 1, this uses keyword matching against the mock census knowledge base.
 * In Phase 2, this will route to Google Gemini 1.5/2.0 API with RAG embeddings.
 */
export async function getAIAssistantResponse(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<{ content: string; actions?: ChatMessage["suggestedActions"] }> {
  // Simulate natural network delay for AI streaming/thinking feel
  await new Promise((resolve) => setTimeout(resolve, 450));

  const lower = userQuery.toLowerCase().trim();

  // Find best match in mock knowledge base
  for (const item of MOCK_KNOWLEDGE_BASE) {
    const isMatch = item.keywords.some((kw) => lower.includes(kw));
    if (isMatch) {
      return {
        content: item.response,
        actions: item.suggestedActions,
      };
    }
  }

  // Fallback answer with contextual guidance
  return {
    content: `Thank you for your question about **"${userQuery}"**.\n\nIn India's Digital Census:\n• **Phase 1** focuses on houselisting and housing amenities (water, electricity, sanitation, clean fuel).\n• **Phase 2** covers population enumeration and demographics (age, education, occupation, languages).\n• You can self-enumerate online during your state's active window or wait for an enumerator visit.\n\nWould you like me to guide you to your state's schedule, preview the self-enumeration form, or explain privacy safeguards?`,
    actions: [
      { label: "Understand Phase 1 & 2", actionType: "link", target: "/about" },
      { label: "Check State Schedule", actionType: "link", target: "/schedule" },
      { label: "Verify Claims on Mythbuster", actionType: "link", target: "/mythbuster" },
    ],
  };
}
