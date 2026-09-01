"use client";

import * as React from "react";
import { KEY_METRICS, SAMPLE_STATE_INSIGHTS } from "@/data/insightsData";
import { MetricCard } from "./MetricCard";
import { DemographicCharts } from "./DemographicCharts";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Bot, BarChart3, Download, ArrowUpRight } from "lucide-react";

interface InsightsDashboardProps {
  onAskAI: (prompt: string) => void;
}

export function InsightsDashboard({ onAskAI }: InsightsDashboardProps) {
  return (
    <div className="space-y-10">
      {/* KPI Metric Cards 4-grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {KEY_METRICS.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Interactive Demographic Charts */}
      <DemographicCharts />

      {/* State-by-State Comparative Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">
                Comparative Matrix
              </Badge>
              <span className="text-xs text-slate-500 font-semibold">
                6 Benchmark States
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              State Key Demographic Indicators (Illustrative Demo)
            </h3>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onAskAI("Explain the demographic differences between major Indian states from the census insights data.")
            }
          >
            <Bot className="h-4 w-4 mr-1.5 text-brand-navy-700" />
            Analyze with CensusAI
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3.5 font-bold text-slate-900">State</th>
                <th className="p-3.5 font-bold text-slate-900">Est. Population (M)</th>
                <th className="p-3.5 font-bold text-slate-900">Literacy Rate</th>
                <th className="p-3.5 font-bold text-slate-900">Urban %</th>
                <th className="p-3.5 font-bold text-slate-900">Rural %</th>
                <th className="p-3.5 font-bold text-slate-900">Digital Access %</th>
                <th className="p-3.5 font-bold text-slate-900">Clean Fuel (LPG) %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_STATE_INSIGHTS.map((st) => (
                <tr key={st.state} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{st.state}</td>
                  <td className="p-3.5 font-mono text-slate-700 font-semibold">
                    {st.populationEstimateMln} M
                  </td>
                  <td className="p-3.5 font-mono text-purple-700 font-bold">
                    {st.literacyRatePct}%
                  </td>
                  <td className="p-3.5 font-mono text-slate-600">{st.urbanPct}%</td>
                  <td className="p-3.5 font-mono text-slate-600">{st.ruralPct}%</td>
                  <td className="p-3.5 font-mono text-emerald-700 font-semibold">
                    {st.digitalAccessPct}%
                  </td>
                  <td className="p-3.5 font-mono text-amber-700 font-semibold">
                    {st.cleanFuelPct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
