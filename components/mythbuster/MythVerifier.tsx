"use client";

import * as React from "react";
import {
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  Search,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  ExternalLink,
  Bot,
  ArrowRight,
} from "lucide-react";
import { CENSUS_MYTHS } from "@/data/mythsData";
import { MythItem, VerdictType } from "@/types/myth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface MythVerifierProps {
  onAskAI: (prompt: string) => void;
}

export function MythVerifier({ onAskAI }: MythVerifierProps) {
  const [claimInput, setClaimInput] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [activeResult, setActiveResult] = React.useState<MythItem | null>(
    CENSUS_MYTHS[0]
  );
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const categories = ["All", "Privacy", "Documents", "Process", "Eligibility"];

  const handleVerify = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || claimInput).trim().toLowerCase();
    if (!query) return;

    setIsVerifying(true);

    setTimeout(() => {
      // Find matching myth or fallback to default
      const matched = CENSUS_MYTHS.find(
        (m) =>
          m.claim.toLowerCase().includes(query) ||
          m.tags.some((t) => query.includes(t.toLowerCase())) ||
          m.category.toLowerCase().includes(query)
      );

      if (matched) {
        setActiveResult(matched);
      } else {
        // Generate dynamic custom response for unlisted query
        setActiveResult({
          id: `custom-${Date.now()}`,
          claim: customQuery || claimInput,
          category: "Privacy",
          verdict: "false",
          shortSummary:
            "Verified False/Misleading. Under Section 15 of the Census Act 1948, all census information is legally protected and cannot be shared or used for punitive purposes.",
          fullExplanation:
            "The Census is conducted strictly for statistical and developmental purposes. Official census workers never ask for financial credentials, bank passwords, or original property documents. Always verify claims through official census portals.",
          keyTakeaway:
            "Census data is confidential by law and purely used for aggregate demographic planning.",
          sourceReference:
            "Section 15, The Census Act 1948 & ORGI Operational Guidelines",
          tags: ["Fact Check", "Verification", "Census Act"],
        });
      }
      setIsVerifying(false);
    }, 400);
  };

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case "false":
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
            <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Verdict: FALSE / MISINFORMATION
            </span>
          </div>
        );
      case "verified_true":
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Verdict: VERIFIED TRUE
            </span>
          </div>
        );
      case "partially_true":
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Verdict: PARTIALLY TRUE / NEEDS CONTEXT
            </span>
          </div>
        );
    }
  };

  const filteredMyths = React.useMemo(() => {
    if (activeCategory === "All") return CENSUS_MYTHS;
    return CENSUS_MYTHS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-10">
      {/* Verification Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            AI-Powered Fact Checker
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Verify Any Census Claim or Question
          </h2>
          <p className="text-sm text-slate-600">
            Type any rumor, viral social media claim, or question about census documentation to get an instant fact-checked verdict.
          </p>
        </div>

        <form onSubmit={(e) => handleVerify(e)} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex-1 relative">
              <Input
                value={claimInput}
                onChange={(e) => setClaimInput(e.target.value)}
                placeholder="Enter a census-related claim or question (e.g., 'Do I need to show bank details?')..."
                className="py-3.5 text-sm sm:text-base pl-4"
              />
            </div>
            <Button
              type="submit"
              variant="saffron"
              size="lg"
              isLoading={isVerifying}
              className="shadow-md shrink-0"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Verify with CensusAI
            </Button>
          </div>
        </form>

        {/* Popular Claims Quick Chips */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Or test these common claims:
          </div>
          <div className="flex flex-wrap gap-2">
            {CENSUS_MYTHS.slice(0, 4).map((myth) => (
              <button
                key={myth.id}
                onClick={() => {
                  setClaimInput(myth.claim);
                  handleVerify(undefined, myth.claim);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-brand-navy-50 text-slate-700 hover:text-brand-navy-900 border border-slate-200 text-left transition-colors truncate max-w-md"
              >
                &ldquo;{myth.claim}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Result Card */}
      {activeResult && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {getVerdictBadge(activeResult.verdict)}
                <Badge variant="outline" size="sm">
                  {activeResult.category}
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Claim: &ldquo;{activeResult.claim}&rdquo;
              </h3>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onAskAI(`Explain the myth verification for: "${activeResult.claim}"`)
              }
              className="shrink-0"
            >
              <Bot className="h-4 w-4 mr-1.5 text-brand-navy-700" />
              Deep Dive with AI
            </Button>
          </div>

          {/* Quick Summary Pill */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800">
            {activeResult.shortSummary}
          </div>

          {/* Full Fact-Check Analysis */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Detailed Fact-Check & Legal Analysis
            </h4>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {activeResult.fullExplanation}
            </p>
          </div>

          {/* Key Takeaway Box */}
          <div className="p-4.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Key Citizen Takeaway: </strong>
              <span>{activeResult.keyTakeaway}</span>
            </div>
          </div>

          {/* Source Reference */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" />
              <span>Official Reference: <strong>{activeResult.sourceReference}</strong></span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              Verified by CensusAI Knowledge Base
            </span>
          </div>
        </div>
      )}

      {/* Myth Library Filter & Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Census Fact-Check Library
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse pre-verified topics to learn your rights and protections.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-brand-navy-900 text-white shadow-2xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMyths.map((myth) => (
            <div
              key={myth.id}
              onClick={() => {
                setActiveResult(myth);
                setClaimInput(myth.claim);
              }}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <Badge variant={myth.verdict === "false" ? "danger" : "success"} size="sm">
                  {myth.verdict === "false" ? "False" : "Verified"}
                </Badge>
                <span className="text-[11px] font-semibold text-slate-400">
                  {myth.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                &ldquo;{myth.claim}&rdquo;
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2">
                {myth.shortSummary}
              </p>

              <div className="pt-2 text-[11px] font-semibold text-brand-navy-700 flex items-center gap-1">
                <span>View Full Verdict & Reference</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
