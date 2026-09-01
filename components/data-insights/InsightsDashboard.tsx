"use client";

import * as React from "react";
import { SUMMARY_METRIC_CARDS } from "@/data/insightsData";
import { DataCategory } from "@/types/insights";
import { MetricCard } from "./MetricCard";
import { InsightFilters } from "./InsightFilters";
import { ChartContainer } from "./ChartContainer";
import { DemographicCharts } from "./DemographicCharts";
import { Users, PieChart, BookOpen, Users2, Building, Info, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InsightsDashboardProps {
  onAskAI?: (prompt: string) => void;
}

export function InsightsDashboard({ onAskAI }: InsightsDashboardProps) {
  const [selectedState, setSelectedState] = React.useState<string>("Maharashtra");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("All Districts");
  const [selectedCategory, setSelectedCategory] = React.useState<DataCategory>("population");

  return (
    <div className="space-y-10">
      {/* 2. Insight Controls Panel */}
      <InsightFilters
        selectedState={selectedState}
        onStateChange={setSelectedState}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* State & Selection Indicator Banner */}
      <div className="p-4 rounded-2xl bg-brand-navy-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand-saffron-500/20 border border-brand-saffron-400/40 text-brand-saffron-300 flex items-center justify-center font-bold text-sm">
            {selectedState.charAt(0)}
          </div>
          <div>
            <div className="text-xs text-slate-300">
              Active Context: <strong className="text-white">{selectedState}</strong> &bull; District: <strong className="text-white">{selectedDistrict}</strong>
            </div>
            <div className="text-xs text-brand-saffron-300 font-medium">
              Category View: <span className="capitalize">{selectedCategory.replace("_", " ")}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-300 flex items-center gap-2">
          <Info className="h-4 w-4 text-brand-saffron-400 shrink-0" />
          <span>All values below are demonstration/prototype census estimates.</span>
        </div>
      </div>

      {/* 3. Summary Metric Cards (4-grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {selectedState} Key Summary Metrics
          </h3>
          <span className="text-xs text-slate-500">4 Core Demographic Indicators</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SUMMARY_METRIC_CARDS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* 4. Data Insight Sections (Placeholder Chart Containers) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Demographic Visualization Containers
          </h3>
          <span className="text-xs text-slate-500">Interactive Chart Containers</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Container 1: Population Distribution */}
          <ChartContainer
            title="Population Distribution"
            subtitle={`Decennial & age-group distribution for ${selectedState} (${selectedDistrict})`}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            categoryBadge="Population"
          >
            <div className="h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h5 className="text-sm font-bold text-slate-800">
                  Population Pyramid & Age Distribution Chart
                </h5>
                <p className="text-xs text-slate-500">
                  Interactive visualization container ready for age cohort & district density data binding.
                </p>
              </div>
            </div>
          </ChartContainer>

          {/* Container 2: Urban vs Rural Split */}
          <ChartContainer
            title="Urban vs Rural Split"
            subtitle={`Urbanization ratio across statutory towns vs rural gram panchayats in ${selectedState}`}
            icon={<Building className="h-5 w-5 text-amber-600" />}
            categoryBadge="Urban vs Rural"
          >
            <div className="h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <PieChart className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h5 className="text-sm font-bold text-slate-800">
                  Urban-Rural Household Ratio Chart
                </h5>
                <p className="text-xs text-slate-500">
                  Interactive donut chart container configured for statutory town vs rural habitation breakdown.
                </p>
              </div>
            </div>
          </ChartContainer>

          {/* Container 3: Literacy Overview */}
          <ChartContainer
            title="Literacy Overview"
            subtitle={`Effective literacy rates, gender literacy gaps, and educational attainment in ${selectedState}`}
            icon={<BookOpen className="h-5 w-5 text-purple-600" />}
            categoryBadge="Literacy"
          >
            <div className="h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h5 className="text-sm font-bold text-slate-800">
                  Literacy Progress & Educational Level Chart
                </h5>
                <p className="text-xs text-slate-500">
                  Interactive progress bar container comparing male vs female literacy milestones across districts.
                </p>
              </div>
            </div>
          </ChartContainer>

          {/* Container 4: Gender Distribution */}
          <ChartContainer
            title="Gender Distribution"
            subtitle={`Sex ratio (females per 1,000 males) and child sex ratio trends in ${selectedState}`}
            icon={<Users2 className="h-5 w-5 text-pink-600" />}
            categoryBadge="Gender"
          >
            <div className="h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                <Users2 className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h5 className="text-sm font-bold text-slate-800">
                  Sex Ratio & Gender Demographic Chart
                </h5>
                <p className="text-xs text-slate-500">
                  Visualization container ready for overall sex ratio and 0-6 child sex ratio trend tracking.
                </p>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>

      {/* Existing Detailed Interactive Charts Component */}
      <DemographicCharts />
    </div>
  );
}
