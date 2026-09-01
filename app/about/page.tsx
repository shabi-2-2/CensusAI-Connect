"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, BookOpen, Layers } from "lucide-react";
import { CENSUS_PHASES } from "@/data/phasesData";
import { PhaseDetailCard } from "@/components/about/PhaseDetailCard";
import { PhaseComparison } from "@/components/about/PhaseComparison";
import { AIAssistantFloating } from "@/components/ai/AIAssistantFloating";
import { Button } from "@/components/ui/Button";

export default function AboutCensusPage() {
  const [isAIOpen, setIsAIOpen] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState<string | undefined>(undefined);

  const handleAskAI = (prompt: string) => {
    setAiPrompt(prompt);
    setIsAIOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Header */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-brand-navy-950 via-brand-navy-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 text-brand-saffron-300 text-xs font-semibold border border-slate-700 mb-6">
            <Layers className="h-3.5 w-3.5 text-brand-saffron-400" />
            <span>Mastering the Two Census Phases</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            How India Conducts the World&apos;s Largest Digital Census
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            The Census of India is carried out in two distinct, complementary operations: first mapping housing infrastructure and civic amenities, followed by comprehensive population enumeration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <a href="#phase-1">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                Jump to Phase 1 (Housing)
              </Button>
            </a>
            <a href="#phase-2">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                Jump to Phase 2 (Population)
              </Button>
            </a>
            <a href="#comparison">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                View Comparison Table
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Phase 1 Card */}
        <PhaseDetailCard
          phase={CENSUS_PHASES[0]}
          onAskAI={handleAskAI}
        />

        {/* Phase 2 Card */}
        <PhaseDetailCard
          phase={CENSUS_PHASES[1]}
          onAskAI={handleAskAI}
        />

        {/* Phase Comparison Table */}
        <PhaseComparison onAskAI={handleAskAI} />

        {/* Next Steps Card */}
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono font-bold text-brand-saffron-300 uppercase tracking-wider">
              Ready to take action?
            </span>
            <h3 className="text-2xl font-bold text-white">
              Check when self-enumeration opens in your State
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Each state operates on a customized schedule to accommodate climate and regional factors. Check your exact timeline now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link href="/schedule" className="w-full sm:w-auto">
              <Button variant="saffron" size="lg" className="w-full">
                Check State Schedule
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/self-enumeration" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                Preview Self Enumeration
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating AI Assistant Integration */}
      <AIAssistantFloating
        isOpen={isAIOpen}
        onToggle={() => setIsAIOpen(!isAIOpen)}
        initialPrompt={aiPrompt}
      />
    </div>
  );
}
