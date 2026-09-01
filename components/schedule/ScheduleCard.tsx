"use client";

import * as React from "react";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  Phone,
  AlertTriangle,
  Sparkles,
  Info,
  Calendar,
} from "lucide-react";
import { StateCensusSchedule, PhaseStatus } from "@/types/schedule";
import { Badge } from "@/components/ui/Badge";

interface ScheduleCardProps {
  schedule: StateCensusSchedule;
  resolvedLocationInfo?: {
    matchedLocation: string;
    locationType: "city" | "state";
  } | null;
}

export function ScheduleCard({ schedule, resolvedLocationInfo }: ScheduleCardProps) {
  const getStatusBadge = (status: PhaseStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" size="md">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      {/* Location Match Alert if query resolved a city */}
      {resolvedLocationInfo && (
        <div className="p-3.5 bg-brand-navy-50 border border-brand-navy-100 text-brand-navy-900 text-xs rounded-xl flex items-center gap-2">
          <Info className="h-4 w-4 text-brand-saffron-600 shrink-0" />
          <span>
            Resolved location query for{" "}
            <strong className="font-bold uppercase tracking-wide">
              {resolvedLocationInfo.matchedLocation}
            </strong>{" "}
            ({resolvedLocationInfo.locationType === "city" ? "City → " : ""}
            State: <strong>{schedule.stateName}</strong>)
          </span>
        </div>
      )}

      {/* Demo Data Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950 text-sm">Prototype Schedule Notice</h4>
          <p className="mt-0.5 text-amber-800">
            Prototype Schedule: Dates shown are demonstration data and must not be treated as official Census 2027 dates.
          </p>
        </div>
      </div>

      {/* State Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-brand-navy-50 border border-brand-navy-100 text-brand-navy-900 flex items-center justify-center font-bold text-lg">
            <MapPin className="h-6 w-6 text-brand-saffron-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {schedule.stateName}
              </h2>
              <Badge variant="secondary" size="sm">
                {schedule.region} Region
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              State-wise Census 2027 Schedule & Self-Enumeration Windows
            </p>
          </div>
        </div>

        <div>{getStatusBadge(schedule.status)}</div>
      </div>

      {/* Phase 1 & Phase 2 Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phase 1 Box */}
        <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/90 px-3 py-1 rounded-md border border-blue-200 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-blue-700" />
              Phase 1: Houselisting & Housing Census
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-500 font-medium">Door-to-Door Field Enumeration:</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                {schedule.phase1Start} to {schedule.phase1End}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-blue-100 shadow-2xs">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-brand-saffron-500" />
                Self-Enumeration Online Window:
              </div>
              <div className="text-sm font-bold text-slate-800 font-mono mt-1">
                {schedule.selfEnumerationStart} to {schedule.selfEnumerationEnd}
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 Box */}
        <div className="p-6 rounded-2xl bg-orange-50/50 border border-brand-saffron-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-saffron-900 bg-brand-saffron-100/90 px-3 py-1 rounded-md border border-brand-saffron-200 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-brand-saffron-700" />
              Phase 2: Population Enumeration
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-500 font-medium">Population Field Enumeration:</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                {schedule.phase2Start} to {schedule.phase2End}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-orange-100 shadow-2xs">
              <div className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-brand-saffron-500" />
                Self-Enumeration Online Window:
              </div>
              <div className="text-sm font-bold text-slate-800 font-mono mt-1">
                {schedule.phase2Start} to {schedule.phase2End}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Nodal Office & Helpline */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
        {schedule.nodalOffice && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900">Regional Authority: </span>
              {schedule.nodalOffice}
            </div>
          </div>
        )}

        {schedule.helpline && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900">Citizen Helpline: </span>
              <span className="font-mono font-bold text-brand-navy-900">{schedule.helpline}</span>
            </div>
          </div>
        )}
      </div>

      {schedule.notes && (
        <div className="p-3 rounded-xl bg-slate-100/70 text-xs text-slate-700 flex items-start gap-2">
          <Info className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Field Operational Note: </strong>
            {schedule.notes}
          </span>
        </div>
      )}
    </div>
  );
}
