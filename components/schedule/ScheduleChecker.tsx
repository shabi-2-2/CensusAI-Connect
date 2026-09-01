"use client";

import * as React from "react";
import { Search, MapPin, AlertCircle, Bot, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import {
  STATE_SCHEDULES,
  resolveLocationFromQuery,
} from "@/data/scheduleData";
import { StateCensusSchedule, ScheduleQueryIntent, ScheduleExtractionResult } from "@/types/schedule";
import { StateSelector } from "@/components/schedule/StateSelector";
import { ScheduleCard } from "@/components/schedule/ScheduleCard";
import { Button } from "@/components/ui/Button";

interface ScheduleCheckerProps {
  onAskAI?: (prompt: string) => void;
}

export function ScheduleChecker({ onAskAI }: ScheduleCheckerProps) {
  const [selectedStateId, setSelectedStateId] = React.useState<string>("maharashtra");
  const [naturalQuery, setNaturalQuery] = React.useState<string>("");
  const [queryError, setQueryError] = React.useState<string | null>(null);
  const [isProcessingAI, setIsProcessingAI] = React.useState<boolean>(false);
  const [generatedAnswer, setGeneratedAnswer] = React.useState<string | null>(null);
  const [resolvedLocationInfo, setResolvedLocationInfo] = React.useState<{
    matchedLocation: string;
    locationType: "city" | "state";
  } | null>(null);

  const selectedState = React.useMemo(() => {
    return (
      STATE_SCHEDULES.find((s) => s.id === selectedStateId) || STATE_SCHEDULES[0]
    );
  }, [selectedStateId]);

  // Validate extracted state string against scheduleData.ts
  const findMatchingState = (stateInput?: string | null): StateCensusSchedule | null => {
    if (!stateInput?.trim()) return null;
    const norm = stateInput.toLowerCase().trim();

    return (
      STATE_SCHEDULES.find((st) => {
        const full = st.stateName.toLowerCase();
        const clean = st.stateName.replace(/\s*\([^)]*\)/g, "").toLowerCase();
        return norm === st.id || norm === full || norm === clean || full.includes(norm) || norm.includes(clean);
      }) || null
    );
  };

  // Generate concise user-friendly answer based strictly on scheduleData.ts
  const buildAnswerFromData = (
    intent: ScheduleQueryIntent,
    schedule: StateCensusSchedule,
    locationMentioned?: string | null
  ): string => {
    const locPrefix = locationMentioned ? `For ${locationMentioned} (` : "Based on ";
    const locSuffix = locationMentioned ? `state of ${schedule.stateName})` : `the CensusAI Connect prototype schedule for ${schedule.stateName}`;

    switch (intent) {
      case "self_enumeration_date":
        return `${locPrefix}${locSuffix}, the digital self-enumeration window is from ${schedule.selfEnumerationStart} to ${schedule.selfEnumerationEnd}.`;
      case "phase1_dates":
        return `${locPrefix}${locSuffix}, Phase 1 (Houselisting & Housing Census) field enumeration is scheduled from ${schedule.phase1Start} to ${schedule.phase1End}.`;
      case "phase2_dates":
        return `${locPrefix}${locSuffix}, Phase 2 (Population Enumeration) field enumeration is scheduled from ${schedule.phase2Start} to ${schedule.phase2End}.`;
      case "missed_deadline":
        return `${locPrefix}${locSuffix}, if you miss the digital self-enumeration window (${schedule.selfEnumerationStart} to ${schedule.selfEnumerationEnd}), an official census enumerator will visit your household during Phase 1 (${schedule.phase1Start} to ${schedule.phase1End}).`;
      case "schedule_overview":
      case "general_schedule_question":
      default:
        return `${locPrefix}${locSuffix}, Phase 1 self-enumeration is ${schedule.selfEnumerationStart} to ${schedule.selfEnumerationEnd}, Phase 1 field census is ${schedule.phase1Start} to ${schedule.phase1End}, and Phase 2 population census is ${schedule.phase2Start} to ${schedule.phase2End}.`;
    }
  };

  // Handle direct dropdown or quick-chip selection
  const handleSelectState = (stateId: string) => {
    setSelectedStateId(stateId);
    setQueryError(null);
    setGeneratedAnswer(null);
    setResolvedLocationInfo(null);
  };

  // Handle natural language input query (Gemini NLU with fallback)
  const handleQuerySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = naturalQuery.trim();
    if (!trimmed) {
      setQueryError(null);
      setGeneratedAnswer(null);
      setResolvedLocationInfo(null);
      return;
    }

    setQueryError(null);
    setGeneratedAnswer(null);
    setIsProcessingAI(true);

    let extractedData: ScheduleExtractionResult | null = null;

    // STEP 2 & STEP 3: Call Gemini schedule extraction endpoint
    try {
      const response = await fetch("/api/ai/schedule-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.extraction) {
          extractedData = json.extraction as ScheduleExtractionResult;
        }
      }
    } catch {
      // Ignore AI error and move to fallback
    }

    setIsProcessingAI(false);

    // STEP 4 & STEP 5: Process extracted state & intent, validate against scheduleData.ts
    if (extractedData) {
      const geminiMatchedState = findMatchingState(extractedData.state || extractedData.location);

      if (geminiMatchedState) {
        setSelectedStateId(geminiMatchedState.id);
        setResolvedLocationInfo({
          matchedLocation: extractedData.location || geminiMatchedState.stateName,
          locationType: extractedData.location ? "city" : "state",
        });

        // Generate response using actual local schedule data ONLY
        const answer = buildAnswerFromData(
          extractedData.intent,
          geminiMatchedState,
          extractedData.location
        );
        setGeneratedAnswer(answer);
        return;
      }
    }

    // STEP 6: Fallback to existing deterministic location detection from Phase 5.1
    const deterministic = resolveLocationFromQuery(trimmed);

    if (deterministic.state && deterministic.matchedLocation && deterministic.locationType) {
      setSelectedStateId(deterministic.state.id);
      setResolvedLocationInfo({
        matchedLocation: deterministic.matchedLocation,
        locationType: deterministic.locationType,
      });

      const fallbackAnswer = buildAnswerFromData(
        "general_schedule_question",
        deterministic.state,
        deterministic.matchedLocation
      );
      setGeneratedAnswer(fallbackAnswer);
    } else {
      // If location cannot be identified
      setQueryError("We could not identify your state. Please select a state manually.");
      setResolvedLocationInfo(null);
      setGeneratedAnswer(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Location Resolution Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-saffron-600" />
            Find Census 2027 Schedule For Your Location
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Search by city name, state name, or type a natural query to look up phase dates and self-enumeration windows.
          </p>
        </div>

        {/* Natural Language Query Input */}
        <form onSubmit={handleQuerySubmit} className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Search by Location or Natural Query
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={naturalQuery}
                disabled={isProcessingAI}
                onChange={(e) => {
                  setNaturalQuery(e.target.value);
                  if (queryError) setQueryError(null);
                }}
                placeholder='Example: I live in Pune. When can I self-enumerate?'
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 focus:border-transparent disabled:bg-slate-100"
              />
            </div>
            <Button
              type="submit"
              variant="saffron"
              size="md"
              disabled={isProcessingAI}
              className="shrink-0"
            >
              {isProcessingAI ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find Schedule
                </>
              )}
            </Button>
          </div>
        </form>

        {/* STEP 7: Status Indicator while processing */}
        {isProcessingAI && (
          <div className="p-3.5 bg-blue-50 text-blue-800 text-xs rounded-xl border border-blue-200 flex items-center gap-2.5 animate-pulse">
            <Loader2 className="h-4 w-4 text-blue-600 shrink-0 animate-spin" />
            <span className="font-semibold">Understanding your question...</span>
          </div>
        )}

        {/* Generated User Answer based ONLY on local schedule data */}
        {generatedAnswer && !isProcessingAI && (
          <div className="p-4 bg-emerald-50/90 text-emerald-950 text-sm rounded-2xl border border-emerald-200/90 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              Answer Summary (Local Schedule Data)
            </div>
            <p className="text-slate-800 font-medium leading-relaxed pt-0.5">
              {generatedAnswer}
            </p>
          </div>
        )}

        {/* Query Error Notice */}
        {queryError && !isProcessingAI && (
          <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <p className="font-medium">{queryError}</p>
          </div>
        )}

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase text-slate-400 tracking-wider">
            OR SELECT STATE DIRECTLY
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* State Selector Dropdown */}
        <StateSelector
          selectedStateId={selectedStateId}
          onSelectState={handleSelectState}
        />

        {/* Quick State Chips */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Quick Select:
          </span>
          {[
            "maharashtra",
            "uttar-pradesh",
            "bihar",
            "west-bengal",
            "tamil-nadu",
            "karnataka",
            "kerala",
            "gujarat",
            "delhi",
            "rajasthan",
          ].map((id) => {
            const st = STATE_SCHEDULES.find((s) => s.id === id);
            if (!st) return null;
            const isSelected = selectedStateId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectState(id)}
                className={`text-xs px-3 py-1 rounded-lg border whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-brand-navy-900 text-white border-brand-navy-900 font-semibold shadow-2xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {st.stateName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Result Card */}
      {selectedState && (
        <ScheduleCard
          schedule={selectedState}
          resolvedLocationInfo={resolvedLocationInfo}
        />
      )}

      {/* Ask AI CTA if prop provided */}
      {onAskAI && selectedState && (
        <div className="p-4 bg-gradient-to-r from-brand-navy-900 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-brand-saffron-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Have specific questions about {selectedState.stateName}?</h4>
              <p className="text-xs text-slate-300">
                Ask CensusAI Copilot about documents needed, district offices, or enumeration procedures.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="saffron"
            size="sm"
            onClick={() =>
              onAskAI(
                `What documents are needed for self-enumeration in ${selectedState.stateName}?`
              )
            }
            className="shrink-0"
          >
            <Sparkles className="h-4 w-4 mr-1.5" />
            Ask CensusAI
          </Button>
        </div>
      )}
    </div>
  );
}

