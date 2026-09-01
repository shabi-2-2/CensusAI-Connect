"use client";

import * as React from "react";
import { InsightsDashboard } from "@/components/data-insights/InsightsDashboard";
import { AIAssistantFloating } from "@/components/ai/AIAssistantFloating";
import { BarChart3, Sparkles, Info, ShieldAlert } from "lucide-react";

export default function DataInsightsPage() {
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-semibold border border-cyan-200">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>CENSUS INTELLIGENCE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                India Census Data Insights
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
                Explore demographic and census trends across India through interactive visualizations and state-level analytics.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200 shadow-2xs">
              <Info className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Prototype Analytics</span>
            </div>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <InsightsDashboard onAskAI={handleAskAI} />
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
