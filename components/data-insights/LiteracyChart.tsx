"use client";

import * as React from "react";
import { BookOpen } from "lucide-react";

interface LiteracyChartProps {
  overallPct: number;
  malePct: number;
  femalePct: number;
  locationLabel: string;
}

export function LiteracyChart({
  overallPct,
  malePct,
  femalePct,
  locationLabel,
}: LiteracyChartProps) {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full space-y-4">
        {/* Overall */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-purple-600" /> Overall Literacy
            </span>
            <span className="font-black text-purple-600">{overallPct}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>

        {/* Male */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-slate-600">Male Literacy</span>
            <span className="font-black text-blue-500">{malePct}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-700 delay-100"
              style={{ width: `${malePct}%` }}
            />
          </div>
        </div>

        {/* Female */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-slate-600">Female Literacy</span>
            <span className="font-black text-pink-500">{femalePct}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-500 rounded-full transition-all duration-700 delay-200"
              style={{ width: `${femalePct}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-slate-400 font-mono">
        Literacy rates · {locationLabel} · Prototype Data
      </div>
    </div>
  );
}
