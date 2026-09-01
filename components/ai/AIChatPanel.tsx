"use client";

import * as React from "react";
import Link from "next/link";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "@/types/chat";
import { SUGGESTED_PROMPTS } from "@/data/mockChatResponses";
import { getAIAssistantResponse } from "@/lib/ai-assistant";
import { cn } from "@/lib/utils";

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export function AIChatPanel({
  isOpen,
  onClose,
  initialPrompt,
}: AIChatPanelProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Namaste! 🙏 I am **CensusAI**, your intelligent assistant for India's digital census.\n\nI can explain **Phase 1 (Houselisting)** and **Phase 2 (Population Enumeration)**, verify privacy rules, and guide you through self-enumeration.",
      timestamp: new Date(),
      suggestedActions: [
        { label: "What is Phase 1?", actionType: "query", target: "What is Phase 1 (Houselisting)?" },
        { label: "What is Phase 2?", actionType: "query", target: "What questions are asked in Phase 2?" },
        { label: "Check State Schedule", actionType: "link", target: "/schedule" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle external initial prompt trigger (e.g. from Hero or About buttons)
  React.useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResult = await getAIAssistantResponse(textToSend, messages);
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResult.content,
        suggestedActions: aiResult.actions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content:
            "I encountered a temporary issue retrieving census information. Please try asking again or select one of the suggested topics below.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: NonNullable<ChatMessage["suggestedActions"]>[number]) => {
    if (action.actionType === "query") {
      handleSendMessage(action.target);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: "assistant",
        content:
          "Chat reset. How may I assist you with India's Digital Census today?",
        timestamp: new Date(),
        suggestedActions: [
          { label: "What is Phase 1?", actionType: "query", target: "What is Phase 1 (Houselisting)?" },
          { label: "What is Phase 2?", actionType: "query", target: "What questions are asked in Phase 2?" },
          { label: "Is personal data safe?", actionType: "query", target: "Is my personal data kept confidential?" },
        ],
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 sm:right-6 sm:bottom-6 sm:inset-y-auto sm:max-h-[640px] w-full sm:w-[440px] bg-white sm:rounded-3xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-brand-navy-800 text-white p-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-xl bg-brand-navy-700 border border-brand-navy-500 flex items-center justify-center text-white shadow-md">
              <Bot className="h-5 w-5 text-brand-saffron-400" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-brand-green-500 border-2 border-brand-navy-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white tracking-tight">
                CensusAI Assistant
              </h3>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-saffron-500/20 text-brand-saffron-300 border border-brand-saffron-400/30">
                Gemini Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              India&apos;s Digital Census Knowledge Bot
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 max-h-[440px]">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-2.5 max-w-[92%]",
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs mt-0.5",
                  isUser
                    ? "bg-brand-saffron-500 text-white"
                    : "bg-brand-navy-900 text-white"
                )}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-brand-saffron-400" />}
              </div>

              {/* Bubble */}
              <div className="space-y-2">
                <div
                  className={cn(
                    "p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs",
                    isUser
                      ? "bg-brand-navy-900 text-white rounded-tr-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                  )}
                >
                  <div className="whitespace-pre-line space-y-1.5 font-normal">
                    {msg.content}
                  </div>
                </div>

                {/* Suggested Action Chips inside Assistant message */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action, idx) => {
                      if (action.actionType === "link") {
                        return (
                          <Link
                            key={idx}
                            href={action.target}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-brand-navy-50 text-brand-navy-800 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
                          >
                            <span>{action.label}</span>
                            <ExternalLink className="h-3 w-3 text-brand-navy-500" />
                          </Link>
                        );
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-brand-saffron-50 text-slate-800 border border-slate-200 hover:border-brand-saffron-300 text-xs font-medium transition-colors shadow-2xs text-left"
                        >
                          <ChevronRight className="h-3 w-3 text-brand-saffron-500" />
                          <span>{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
            <div className="h-7 w-7 rounded-lg bg-brand-navy-900 flex items-center justify-center text-white shrink-0">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-saffron-400" />
            </div>
            <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-xs flex items-center gap-1.5 text-xs text-slate-600 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-navy-600 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-navy-600 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-navy-600 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts Bar */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] font-semibold uppercase text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-brand-saffron-500" />
          Quick:
        </span>
        {SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => handleSendMessage(prompt.text)}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-brand-navy-50 text-slate-700 hover:text-brand-navy-900 border border-slate-200/80 whitespace-nowrap transition-colors shrink-0"
          >
            {prompt.text}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask anything about India's Census..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-brand-navy-600 focus:outline-none transition-all"
        />
        <Button
          type="submit"
          variant="saffron"
          size="sm"
          disabled={!inputValue.trim() || isTyping}
          className="rounded-xl px-3.5 py-2.5"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
