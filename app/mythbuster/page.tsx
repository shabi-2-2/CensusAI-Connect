"use client";

import * as React from "react";
import { MythVerifier } from "@/components/mythbuster/MythVerifier";
import { AIAssistantFloating } from "@/components/ai/AIAssistantFloating";
import { ShieldCheck, Sparkles, HelpCircle } from "lucide-react";

export default function MythbusterPage() {
  const [isAIOpen, setIsAIOpen] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState<string | undefined>(undefined);

  const handleAskAI = (prompt: string) => {
    setAiPrompt(prompt);
    setIsAIOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Header */}
      <section className="pt-10 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Misinformation & Myth Defense</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Census Mythbuster & Verification
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Check whether any census claim is factual or a hoax. Protect your personal data and verify legal safeguards under the Census Act.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <Sparkles className="h-4 w-4 text-brand-saffron-600 shrink-0" />
              <span>Section 15 Legal Protection Guide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <MythVerifier onAskAI={handleAskAI} />
      </main>

      {/* Floating AI Assistant */}
      <AIAssistantFloating
        isOpen={isAIOpen}
        onToggle={() => setIsAIOpen(!isAIOpen)}
        initialPrompt={aiPrompt}
      />
    </div>
  );
}
