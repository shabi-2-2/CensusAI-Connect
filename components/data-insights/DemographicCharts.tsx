"use client";

import * as React from "react";
import {
  POPULATION_DECENNIAL_TREND,
  LITERACY_BY_REGION,
  AMENITIES_PROGRESS_DATA,
} from "@/data/insightsData";
import { BarChart2, TrendingUp, Sparkles, Layers, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function DemographicCharts() {
  const [activeChart, setActiveChart] = React.useState<"growth" | "literacy" | "amenities">("growth");

  const maxPop = 1500;

  return (
    <div className="space-y-8">
      {/* Chart Switcher Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveChart("growth")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
              activeChart === "growth"
                ? "bg-brand-navy-900 text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            Population Growth Trend (1971-2026)
          </button>

          <button
            onClick={() => setActiveChart("literacy")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
              activeChart === "literacy"
                ? "bg-brand-navy-900 text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            State Literacy Comparisons
          </button>

          <button
            onClick={() => setActiveChart("amenities")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap",
              activeChart === "amenities"
                ? "bg-brand-navy-900 text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            Phase 1 Amenities Progress
          </button>
        </div>

        <div className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5" />
          <span>Visualized Demonstration Dataset</span>
        </div>
      </div>

      {/* Chart 1: Population Decennial Growth Trend */}
      {activeChart === "growth" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Decennial Population & Urban Agglomeration Trend
              </h3>
              <p className="text-xs text-slate-500">
                Total India population vs Urban segment in Millions (1971 - 2026 Projection)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-brand-navy-800" />
                <span className="font-semibold text-slate-700">Total Population</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-brand-saffron-500" />
                <span className="font-semibold text-slate-700">Urban Population</span>
              </div>
            </div>
          </div>

          {/* Bar / Column Chart Representation */}
          <div className="h-64 sm:h-80 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-4 px-2 border-b border-slate-200">
            {POPULATION_DECENNIAL_TREND.map((point) => {
              const totalPct = (point.value / maxPop) * 100;
              const urbanPct = ((point.secondaryValue || 0) / maxPop) * 100;

              return (
                <div
                  key={point.label}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
                >
                  <div className="text-[10px] sm:text-xs font-bold text-slate-700 group-hover:text-brand-navy-900">
                    {point.value}M
                  </div>

                  <div className="w-full max-w-[48px] flex items-end gap-1 h-full justify-center">
                    {/* Total bar */}
                    <div
                      style={{ height: `${totalPct}%` }}
                      className="w-1/2 bg-gradient-to-t from-brand-navy-950 to-brand-navy-700 rounded-t-lg transition-all duration-300 group-hover:brightness-110 shadow-xs relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 transition-opacity">
                        Total: {point.value}M
                      </div>
                    </div>

                    {/* Urban bar */}
                    <div
                      style={{ height: `${urbanPct}%` }}
                      className="w-1/2 bg-gradient-to-t from-brand-saffron-600 to-brand-saffron-400 rounded-t-lg transition-all duration-300 group-hover:brightness-110 shadow-xs relative"
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 transition-opacity">
                        Urban: {point.secondaryValue}M
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-600 mt-2">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900">2026 Projection: </span>
              ~1.428 Billion Total Citizens
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900">Urban Migration: </span>
              Urban population grew from 108M (1971) to ~502M (2026)
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-900">Decadal Growth: </span>
              Stabilizing at +12.4% rate
            </div>
          </div>
        </div>
      )}

      {/* Chart 2: State Literacy Comparisons */}
      {activeChart === "literacy" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Literacy Rate Disparities & Female Literacy
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of overall literacy rate vs female literacy rate (%) across benchmark states
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-purple-600" />
                <span className="font-semibold text-slate-700">Overall Literacy (%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">Female Literacy (%)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {LITERACY_BY_REGION.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900">
                  <span>{item.label}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-purple-700">{item.value}% Overall</span>
                    <span className="text-emerald-700">{item.secondaryValue}% Female</span>
                  </div>
                </div>

                <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${item.value}%` }}
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart 3: Phase 1 Amenities Progress */}
      {activeChart === "amenities" && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Phase 1 Houselisting: Standard of Living Transformation
              </h3>
              <p className="text-xs text-slate-500">
                Comparing household amenities access in 2011 Census vs 2026 Digital Benchmark (%)
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-slate-400" />
                <span className="font-semibold text-slate-700">2011 Baseline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-brand-green-500" />
                <span className="font-semibold text-slate-700">2026 Target/Current</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AMENITIES_PROGRESS_DATA.map((amenity) => (
              <div
                key={amenity.label}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">
                    {amenity.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-green-700 bg-brand-green-50 px-2 py-0.5 rounded border border-brand-green-200">
                    +{((amenity.value - (amenity.secondaryValue || 0))).toFixed(1)}% Growth
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>2026 Level</span>
                      <span className="font-bold">{amenity.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${amenity.value}%` }}
                        className="h-full bg-brand-green-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>2011 Level</span>
                      <span>{amenity.secondaryValue}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${amenity.secondaryValue}%` }}
                        className="h-full bg-slate-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
