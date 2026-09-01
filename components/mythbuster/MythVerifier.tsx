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
  ArrowRight,
  ShieldCheck,
  Loader2,
  Sparkles,
  Bot,
} from "lucide-react";
import { MYTHS_DATA, searchMyths } from "@/data/mythsData";
import { MythEntry, VerdictType, MythInterpretationResponse } from "@/types/myth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/LanguageProvider";

import { TranslationKey } from "@/translations";

interface MythVerifierProps {
  onAskAI?: (prompt: string) => void;
}

const CATEGORIES: { label: string; id: string; key: TranslationKey }[] = [
  { label: "All", id: "All", key: "myth.filterAll" },
  { label: "Privacy", id: "privacy", key: "myth.filterPrivacy" },
  { label: "Fraud & Safety", id: "fraud", key: "myth.filterFraud" },
  { label: "Data Use", id: "data", key: "myth.filterData" },
  { label: "Enumeration", id: "enumeration", key: "myth.filterEnumeration" },
  { label: "Eligibility", id: "eligibility", key: "myth.filterEligibility" },
];

export function MythVerifier({ onAskAI }: MythVerifierProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedMyth, setSelectedMyth] = React.useState<MythEntry | null>(null);

  // Phase 6.2A State variables
  const [isAnalyzingAI, setIsAnalyzingAI] = React.useState<boolean>(false);
  const [aiResult, setAiResult] = React.useState<MythInterpretationResponse | null>(null);

  // Deterministic keyword matching via searchMyths helper
  const displayedMyths = React.useMemo(() => {
    // If we have an AI result that matched a myth, prioritize that match first in displayed list
    if (aiResult?.matchedMyth) {
      const otherMyths = searchMyths(searchQuery, selectedCategory).filter(
        (m) => m.id !== aiResult.matchedMyth?.id
      );
      return [aiResult.matchedMyth, ...otherMyths];
    }
    return searchMyths(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, aiResult]);

  const handleSearchSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = (customQuery !== undefined ? customQuery : searchQuery).trim();
    if (!queryToUse) {
      setAiResult(null);
      setSelectedMyth(null);
      return;
    }

    setSearchQuery(queryToUse);
    setAiResult(null);

    // Call Gemini Myth Interpretation & Translation API
    setIsAnalyzingAI(true);
    try {
      const res = await fetch("/api/ai/mythbuster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          const apiResp = json as MythInterpretationResponse;
          setAiResult(apiResp);
          if (apiResp.matchedMyth) {
            setSelectedMyth(apiResp.matchedMyth);
          }
        }
      }
    } catch {
      // Fallback gracefully to local keyword match or unverified message on network failure
      const localMatches = searchMyths(queryToUse, selectedCategory);
      if (localMatches.length > 0) {
        setAiResult({
          query: queryToUse,
          isCensusRelated: true,
          matchFound: true,
          source: "deterministic",
          matchedMyth: localMatches[0],
        });
        setSelectedMyth(localMatches[0]);
      } else {
        setAiResult({
          query: queryToUse,
          isCensusRelated: true,
          matchFound: false,
          source: "unverified",
          message: "We could not verify this claim using the current CensusAI Connect knowledge base.",
        });
      }
    } finally {
      setIsAnalyzingAI(false);
    }
  };


  const getLocalizedVerdictLabel = (verdict: VerdictType, lang?: string) => {
    const normLang = (lang || "English").toLowerCase();

    if (normLang.includes("hindi")) {
      switch (verdict) {
        case "false": return "गलत";
        case "misleading": return "भ्रामक";
        case "needs_verification": return "सत्यापन आवश्यक";
      }
    }
    if (normLang.includes("marathi")) {
      switch (verdict) {
        case "false": return "चुकीचे";
        case "misleading": return "भ्रामक";
        case "needs_verification": return "पडताळणी आवश्यक";
      }
    }
    if (normLang.includes("tamil")) {
      switch (verdict) {
        case "false": return "தவறு";
        case "misleading": return "தவறாக வழிநடத்துவது";
        case "needs_verification": return "சரிபார்ப்பு தேவை";
      }
    }
    if (normLang.includes("bengali")) {
      switch (verdict) {
        case "false": return "ভুল";
        case "misleading": return "বিভ্রান্তিকর";
        case "needs_verification": return "যাচাই প্রয়োজন";
      }
    }

    switch (verdict) {
      case "false": return "FALSE";
      case "misleading": return "MISLEADING";
      case "needs_verification": return "NEEDS VERIFICATION";
    }
  };

  const getVerdictBadge = (verdict: VerdictType, lang?: string) => {
    const label = getLocalizedVerdictLabel(verdict, lang);
    switch (verdict) {
      case "false":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-700">
            <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              VERDICT: {label}
            </span>
          </div>
        );
      case "misleading":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              VERDICT: {label}
            </span>
          </div>
        );
      case "needs_verification":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 shrink-0" />
            <span className="font-bold text-xs uppercase tracking-wider">
              VERDICT: {label}
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
            {t("myth.prototypeSafetyNotice")}
          </p>
        </div>
      </div>

      {/* 2. Search Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <form onSubmit={(e) => handleSearchSubmit(e)} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            {t("myth.searchLabel")}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                value={searchQuery}
                disabled={isAnalyzingAI}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("myth.placeholder")}
                aria-label={t("myth.placeholder")}
                className="pl-10 py-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 disabled:bg-slate-100"
              />
            </div>
            <Button
              type="submit"
              variant="saffron"
              size="md"
              disabled={isAnalyzingAI || !searchQuery.trim()}
              className="shrink-0"
            >
              {isAnalyzingAI ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("myth.loading")}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t("myth.button")}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Try test queries:
          </span>
          {[
            "Someone sent me a census link and asked for my OTP",
            "Can the government use my census answers to calculate my taxes?",
            "My bank password is needed for verification, right?",
            "I got a suspicious WhatsApp message about the census",
            "Tell me the best pizza recipe",
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={isAnalyzingAI}
              onClick={() => {
                setSearchQuery(chip);
                handleSearchSubmit(undefined, chip);
              }}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 whitespace-nowrap transition-colors truncate max-w-xs"
            >
              &ldquo;{chip}&rdquo;
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
                {t(cat.key) || cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Processing Loading State */}
      {isAnalyzingAI && (
        <div className="p-4 bg-rose-50 text-rose-900 rounded-2xl border border-rose-200 flex items-center gap-3 animate-pulse">
          <Loader2 className="h-5 w-5 text-rose-600 shrink-0 animate-spin" />
          <div>
            <h4 className="font-bold text-sm">Interpreting Claim & Concept...</h4>
            <p className="text-xs text-rose-800">
              Extracting intent and matching against local mythsData.ts knowledge base.
            </p>
          </div>
        </div>
      )}

      {/* AI-Assisted Concept Banner */}
      {aiResult && !isAnalyzingAI && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-brand-saffron-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                User Query Analysis
              </span>
            </div>
            {aiResult.source === "ai_assisted" && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-900/80 text-rose-200 border border-rose-700/60 font-medium">
                AI-assisted interpretation
              </span>
            )}
            {aiResult.source === "deterministic" && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 font-medium">
                Direct Keyword Match
              </span>
            )}
          </div>

          <div className="text-sm font-semibold text-slate-100 flex flex-wrap items-center gap-2">
            <span>Query: &ldquo;{aiResult.query}&rdquo;</span>
            {aiResult.aiInterpretation?.originalLanguage && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-navy-800 text-brand-saffron-300 font-mono font-medium border border-brand-navy-700">
                Detected: {aiResult.aiInterpretation.originalLanguage}
              </span>
            )}
          </div>

          {aiResult.aiInterpretation?.normalizedQuery &&
            aiResult.aiInterpretation.normalizedQuery.toLowerCase() !== aiResult.query.toLowerCase() && (
              <div className="text-xs text-slate-300 font-medium italic">
                Normalized Meaning: &ldquo;{aiResult.aiInterpretation.normalizedQuery}&rdquo;
              </div>
            )}

          {aiResult.aiInterpretation?.keywords && aiResult.aiInterpretation.keywords.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
              <span className="text-slate-400 font-medium">Extracted English Concepts:</span>
              {aiResult.aiInterpretation.keywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-brand-saffron-300 font-mono text-[11px]">
                  {kw}
                </span>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Selected Myth Detail Card */}
      {selectedMyth && !isAnalyzingAI && (
        <div className="bg-white rounded-3xl border border-rose-200 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-200 relative">
          <button
            type="button"
            onClick={() => setSelectedMyth(null)}
            className="absolute top-6 right-6 text-xs text-slate-400 hover:text-slate-700 font-bold uppercase tracking-wider"
          >
            Close Detail ✕
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {getVerdictBadge(
              aiResult?.localizedMyth?.verdict || selectedMyth.verdict,
              aiResult?.responseLanguage
            )}
            <Badge variant="outline" size="sm" className="capitalize">
              Category: {selectedMyth.category}
            </Badge>
            {aiResult?.responseLanguage && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                Response language: <strong>{aiResult.responseLanguage}</strong>
              </span>
            )}
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Myth Statement</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              &ldquo;{aiResult?.localizedMyth?.myth || selectedMyth.myth}&rdquo;
            </h3>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Explanation</h4>
            <p className="text-sm text-slate-800 leading-relaxed">
              {aiResult?.localizedMyth?.explanation || selectedMyth.explanation}
            </p>
          </div>

          {(aiResult?.localizedMyth?.safetyGuidance || selectedMyth.safetyGuidance) && (
            <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 text-rose-950 text-xs sm:text-sm space-y-0.5">
              <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-rose-600" />
                Safety Guidance
              </h4>
              <p className="text-rose-900 leading-relaxed">
                {aiResult?.localizedMyth?.safetyGuidance || selectedMyth.safetyGuidance}
              </p>
            </div>
          )}

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Reference: <strong>{selectedMyth.sourceLabel}</strong></span>
            <span className="font-mono text-[11px]">Source: mythsData.ts</span>
          </div>
        </div>
      )}


      {/* Unverified / Unmatched Query Result Box */}
      {aiResult && !aiResult.matchFound && !isAnalyzingAI && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-base font-bold text-slate-900">
              We could not verify this claim using the current CensusAI Connect knowledge base.
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Please check official government channels such as the Office of the Registrar General & Census Commissioner, India (ORGI) or Ministry of Home Affairs for verified notifications.
            </p>
          </div>
        </div>
      )}

      {/* 4. Display Myth Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Fact-Check Library ({displayedMyths.length} entries)
          </h3>
          {(searchQuery || aiResult) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setAiResult(null);
                setSelectedMyth(null);
              }}
              className="text-xs text-brand-navy-700 hover:underline font-semibold"
            >
              Clear Search & Results
            </button>
          )}
        </div>

        {displayedMyths.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedMyths.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMyth(item)}
                className={cn(
                  "bg-white rounded-2xl border p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between",
                  selectedMyth?.id === item.id ? "border-rose-500 ring-2 ring-rose-200" : "border-slate-200"
                )}
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
          /* Unmatched Empty State */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <Search className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="text-base font-bold text-slate-900">
                We could not verify this claim using the current CensusAI Connect knowledge base.
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
                  setAiResult(null);
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

