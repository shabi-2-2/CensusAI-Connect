"use client";

import * as React from "react";
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  Phone,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Sparkles,
  Bot,
} from "lucide-react";
import { STATE_SCHEDULES } from "@/data/scheduleData";
import { StateCensusSchedule, PhaseStatus } from "@/types/schedule";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ScheduleCheckerProps {
  onAskAI: (prompt: string) => void;
}

export function ScheduleChecker({ onAskAI }: ScheduleCheckerProps) {
  const [selectedStateId, setSelectedStateId] = React.useState<string>("delhi");
  const [activePhaseFilter, setActivePhaseFilter] = React.useState<"all" | "phase1" | "phase2">("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const currentState = React.useMemo(() => {
    return (
      STATE_SCHEDULES.find((s) => s.id === selectedStateId) || STATE_SCHEDULES[0]
    );
  }, [selectedStateId]);

  const filteredStatesList = React.useMemo(() => {
    if (!searchQuery.trim()) return STATE_SCHEDULES;
    return STATE_SCHEDULES.filter((s) =>
      s.stateName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getStatusBadge = (status: PhaseStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" size="md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
            Active Window
          </Badge>
        );
      case "upcoming":
        return (
          <Badge variant="warning" size="md">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled Upcoming
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" size="md">
            <CheckCircle2 className="h-3 w-3 mr-1 text-slate-500" />
            Completed
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* State Lookup Control Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Dropdown Selector */}
          <div className="md:col-span-6">
            <Select
              label="Select State / Union Territory"
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(e.target.value)}
            >
              {STATE_SCHEDULES.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.stateName} ({state.zone} Zone)
                </option>
              ))}
            </Select>
          </div>

          {/* Quick Filter Buttons */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 w-full sm:w-auto">
              Filter Phase:
            </span>
            <Button
              type="button"
              variant={activePhaseFilter === "all" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActivePhaseFilter("all")}
            >
              All Phases
            </Button>
            <Button
              type="button"
              variant={activePhaseFilter === "phase1" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActivePhaseFilter("phase1")}
            >
              Phase 1 (Housing)
            </Button>
            <Button
              type="button"
              variant={activePhaseFilter === "phase2" ? "primary" : "outline"}
              size="sm"
              onClick={() => setActivePhaseFilter("phase2")}
            >
              Phase 2 (Population)
            </Button>
          </div>
        </div>

        {/* State Quick Chips */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Popular States:
          </span>
          {["delhi", "maharashtra", "karnataka", "tamil-nadu", "uttar-pradesh", "west-bengal"].map(
            (id) => {
              const st = STATE_SCHEDULES.find((s) => s.id === id);
              if (!st) return null;
              const isSelected = selectedStateId === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedStateId(id)}
                  className={cn(
                    "text-xs px-3 py-1 rounded-lg border whitespace-nowrap transition-colors",
                    isSelected
                      ? "bg-brand-navy-900 text-white border-brand-navy-900 font-semibold shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {st.stateName}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Selected State Schedule Result Card */}
      {currentState && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-brand-navy-50 border border-brand-navy-100 text-brand-navy-900 flex items-center justify-center font-bold text-lg">
                <MapPin className="h-6 w-6 text-brand-saffron-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {currentState.stateName}
                  </h2>
                  <Badge variant="secondary" size="sm">
                    {currentState.zone} Zone
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official Digital Census Schedule & Timeline
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onAskAI(
                  `What are the census dates and self-enumeration window for ${currentState.stateName}?`
                )
              }
              className="shrink-0"
            >
              <Bot className="h-4 w-4 mr-1.5 text-brand-navy-700" />
              Ask AI About {currentState.stateName}
            </Button>
          </div>

          {/* Phase 1 & Phase 2 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phase 1 Schedule Card */}
            {(activePhaseFilter === "all" || activePhaseFilter === "phase1") && (
              <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 px-2.5 py-1 rounded-md border border-blue-200">
                    Phase 1: Houselisting
                  </span>
                  {getStatusBadge(currentState.phase1.status)}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">
                      Door-to-Door Enumeration Period:
                    </div>
                    <div className="text-base font-bold text-slate-900 font-mono">
                      {currentState.phase1.startDate} to {currentState.phase1.endDate}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-blue-100">
                    <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-brand-saffron-500" />
                      Self-Enumeration Online Window:
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-0.5">
                      {currentState.phase1.selfEnumerationWindow}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 2 Schedule Card */}
            {(activePhaseFilter === "all" || activePhaseFilter === "phase2") && (
              <div className="p-6 rounded-2xl bg-orange-50/40 border border-brand-saffron-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-saffron-900 bg-brand-saffron-100/80 px-2.5 py-1 rounded-md border border-brand-saffron-200">
                    Phase 2: Population
                  </span>
                  {getStatusBadge(currentState.phase2.status)}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">
                      National Enumeration Period:
                    </div>
                    <div className="text-base font-bold text-slate-900 font-mono">
                      {currentState.phase2.startDate} to {currentState.phase2.endDate}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-orange-100">
                    <div className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-brand-saffron-500" />
                      Self-Enumeration Online Window:
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-0.5">
                      {currentState.phase2.selfEnumerationWindow}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Regional Assistance & Helpline */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900">Regional Authority: </span>
                {currentState.nodalOffice}
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-semibold text-slate-900">Toll-Free Citizen Helpline: </span>
                <span className="font-mono font-bold text-brand-navy-900">{currentState.helpline}</span>
              </div>
            </div>
          </div>

          {currentState.notes && (
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-800 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Field Operational Note: </strong>
                {currentState.notes}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
