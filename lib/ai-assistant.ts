import { ChatMessage } from "@/types/chat";

/**
 * Generate AI Assistant response for a given user query.
 * In Phase 2, this routes to the secure Next.js API route (/api/ai/chat) which uses Gemini.
 */
export async function getAIAssistantResponse(
  userQuery: string,
  history: ChatMessage[] = [],
  context?: string,
  language?: string
): Promise<{ content: string; actions?: ChatMessage["suggestedActions"] }> {
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userQuery,
        history: history.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        context,
        language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get AI response");
    }

    return {
      content: data.message,
    };
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    throw error;
  }
}
