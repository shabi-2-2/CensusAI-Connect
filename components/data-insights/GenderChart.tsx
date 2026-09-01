"use client";

import * as React from "react";
import { Users2 } from "lucide-react";

interface GenderChartProps {
  sexRatio: number;
  malePct: number;
  femalePct: number;
  locationLabel: string;
}

export function GenderChart({
  sexRatio,
  malePct,
  femalePct,
  locationLabel,
}: GenderChartProps) {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex items-center justify-center gap-8 py-4">
        <div className="text-center space-y-1">
          <div className="text-3xl font-black text-pink-500">{sexRatio}</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Females per 1000 Males</div>
        </div>
      </div>

      <div className="w-full flex h-8 rounded-xl overflow-hidden shadow-sm">
        <div 
          className="h-full bg-blue-500 flex items-center justify-start pl-3 text-white text-xs font-bold transition-all duration-700"
          style={{ width: `${malePct}%` }}
        >
          {malePct}%
        </div>
        <div 
          className="h-full bg-pink-500 flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-700"
          style={{ width: `${femalePct}%` }}
        >
          {femalePct}%
        </div>
      </div>
      
      <div className="w-full flex justify-between text-xs font-bold text-slate-600 px-1">
        <span>Male</span>
        <span>Female</span>
      </div>

      <div className="text-center text-[10px] text-slate-400 font-mono mt-2">
        Gender distribution · {locationLabel} · Prototype Data
      </div>
    </div>
  );
}
