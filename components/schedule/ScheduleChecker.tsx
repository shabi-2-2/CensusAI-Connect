"use client";

import * as React from "react";
import { Search, MapPin, AlertCircle, Bot, Sparkles } from "lucide-react";
import {
  STATE_SCHEDULES,
  resolveLocationFromQuery,
} from "@/data/scheduleData";
import { StateCensusSchedule } from "@/types/schedule";
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
  const [resolvedLocationInfo, setResolvedLocationInfo] = React.useState<{
    matchedLocation: string;
    locationType: "city" | "state";
  } | null>(null);

  const selectedState = React.useMemo(() => {
    return (
      STATE_SCHEDULES.find((s) => s.id === selectedStateId) || STATE_SCHEDULES[0]
    );
  }, [selectedStateId]);

  // Handle direct dropdown or quick-chip selection
  const handleSelectState = (stateId: string) => {
    setSelectedStateId(stateId);
    setQueryError(null);
    setResolvedLocationInfo(null);
  };

  // Handle natural language input query (Deterministic extraction)
  const handleQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = naturalQuery.trim();
    if (!trimmed) {
      setQueryError(null);
      setResolvedLocationInfo(null);
      return;
    }

    const { state, matchedLocation, locationType } = resolveLocationFromQuery(trimmed);

    if (state && matchedLocation && locationType) {
      setSelectedStateId(state.id);
      setQueryError(null);
      setResolvedLocationInfo({ matchedLocation, locationType });
    } else {
      setQueryError(
        "We could not identify a supported state from your query. Please select your state."
      );
      setResolvedLocationInfo(null);
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
            Search by Location or Query
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={naturalQuery}
                onChange={(e) => {
                  setNaturalQuery(e.target.value);
                  if (queryError) setQueryError(null);
                }}
                placeholder='Example: I live in Pune. When can I self-enumerate?'
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 focus:border-transparent"
              />
            </div>
            <Button type="submit" variant="saffron" size="md" className="shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Find Schedule
            </Button>
          </div>
        </form>

        {/* Query Error Notice */}
        {queryError && (
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
