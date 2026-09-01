"use client";

import * as React from "react";
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { MYTHS_DATA, searchMyths } from "@/data/mythsData";
import { MythEntry, VerdictType } from "@/types/myth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface MythVerifierProps {
  onAskAI?: (prompt: string) => void;
}

const CATEGORIES = [
  { label: "All", id: "All" },
  { label: "Privacy", id: "privacy" },
  { label: "Fraud & Safety", id: "fraud" },
  { label: "Data Use", id: "data" },
  { label: "Enumeration", id: "enumeration" },
  { label: "Eligibility", id: "eligibility" },
];

export function MythVerifier({ onAskAI }: MythVerifierProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedMyth, setSelectedMyth] = React.useState<MythEntry | null>(null);

  // Deterministic keyword matching via searchMyths helper
  const displayedMyths = React.useMemo(() => {
    return searchMyths(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case "false":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
            <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              VERDICT: FALSE
            </span>
          </div>
        );
      case "misleading":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              VERDICT: MISLEADING
            </span>
          </div>
        );
      case "needs_verification":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              VERDICT: NEEDS VERIFICATION
            </span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* 5. Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-amber-950">Prototype Safety Notice</h4>
          <p className="text-amber-900">
            CensusAI Connect is a prototype. Always verify important census instructions through official government channels.
          </p>
        </div>
      </div>

      {/* 2. Search Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Search Myth Knowledge Base
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask about a census claim or paste a message to check..."
              className="pl-10 py-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Try searching:
          </span>
          {["OTP", "Police", "tax", "WhatsApp", "bank password"].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setSearchQuery(chip)}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* 3. Category Filters */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter by Category
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border",
                  selectedCategory === cat.id
                    ? "bg-brand-navy-900 text-white border-brand-navy-900 shadow-2xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Myth Detail Modal / Header Preview if selected */}
      {selectedMyth && (
        <div className="bg-white rounded-3xl border border-rose-200 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-200 relative">
          <button
            type="button"
            onClick={() => setSelectedMyth(null)}
            className="absolute top-6 right-6 text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider"
          >
            Close Detail ✕
          </button>
          <div className="flex items-center gap-2">
            {getVerdictBadge(selectedMyth.verdict)}
            <Badge variant="outline" size="sm" className="capitalize">
              Category: {selectedMyth.category}
            </Badge>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Myth Statement</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              &ldquo;{selectedMyth.myth}&rdquo;
            </h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Explanation</h4>
            <p className="text-sm text-slate-800 leading-relaxed">{selectedMyth.explanation}</p>
          </div>
          {selectedMyth.safetyGuidance && (
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-rose-950 text-xs sm:text-sm space-y-0.5">
              <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-rose-600" />
                Safety Guidance
              </h4>
              <p className="text-rose-900 leading-relaxed">{selectedMyth.safetyGuidance}</p>
            </div>
          )}
          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Reference: <strong>{selectedMyth.sourceLabel}</strong></span>
            <span className="font-mono text-[11px]">Local mythsData.ts</span>
          </div>
        </div>
      )}

      {/* 4. Display Myth Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Fact-Check Library ({displayedMyths.length} entries)
          </h3>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-brand-navy-700 hover:underline font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>

        {displayedMyths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedMyths.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMyth(item)}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    {getVerdictBadge(item.verdict)}
                    <Badge variant="secondary" size="sm" className="capitalize">
                      {item.category}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      MYTH
                    </span>
                    <h4 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                      &ldquo;{item.myth}&rdquo;
                    </h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      EXPLANATION
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mt-0.5 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-navy-700 font-semibold">
                  <span className="truncate text-slate-500 font-normal">Source: {item.sourceLabel}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Unmatched / Empty Search Result */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="text-base font-bold text-slate-900">
                We could not verify this claim using the current Mythbuster knowledge base.
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Please check official government channels such as the Office of the Registrar General & Census Commissioner, India (ORGI) or Ministry of Home Affairs for verified notifications.
              </p>
            </div>
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                View All Myth Entries
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
