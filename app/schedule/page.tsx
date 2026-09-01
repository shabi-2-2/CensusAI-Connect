"use client";

import * as React from "react";
import { ScheduleChecker } from "@/components/schedule/ScheduleChecker";
import { AIAssistantFloating } from "@/components/ai/AIAssistantFloating";
import { Calendar, Sparkles, Clock, Shield } from "lucide-react";

export default function SchedulePage() {
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 text-brand-navy-900 text-xs font-semibold border border-brand-navy-100">
                <Calendar className="h-3.5 w-3.5 text-brand-navy-600" />
                <span>State & UT Census Timelines</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Census Schedule Checker
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Lookup Phase 1 (Houselisting) and Phase 2 (Population) enumeration dates and digital self-enumeration windows for your state.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <Clock className="h-4 w-4 text-brand-saffron-600 shrink-0" />
              <span>Rolling Schedule 2026-2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Schedule Checker */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ScheduleChecker onAskAI={handleAskAI} />
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
