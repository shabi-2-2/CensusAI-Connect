"use client";

import * as React from "react";
import { DETAILED_STATE_DATA } from "@/data/insightsData";
import { DataCategory, DemographicMetric } from "@/types/insights";
import { MetricCard } from "./MetricCard";
import { InsightFilters } from "./InsightFilters";
import { ChartContainer } from "./ChartContainer";
import { DemographicCharts } from "./DemographicCharts";
import { PopulationChart } from "./PopulationChart";
import { UrbanRuralChart } from "./UrbanRuralChart";
import { LiteracyChart } from "./LiteracyChart";
import { GenderChart } from "./GenderChart";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { Users, PieChart, BookOpen, Users2, Building, Info, Bot, Activity, Home, Percent } from "lucide-react";
import { cn } from "@/lib/utils";


interface InsightsDashboardProps {
  onAskAI?: (prompt: string) => void;
}

export function InsightsDashboard({ onAskAI }: InsightsDashboardProps) {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = React.useState<string>("Maharashtra");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("All Districts");
  const [selectedCategory, setSelectedCategory] = React.useState<DataCategory>("population");

  // Get current state data or fallback to Maharashtra
  const stateData = React.useMemo(() => {
    return DETAILED_STATE_DATA[selectedState] || DETAILED_STATE_DATA["Maharashtra"];
  }, [selectedState]);

  // Find specific district data if selected, else null (which means state-level totals)
  const districtData = React.useMemo(() => {
    if (!selectedDistrict || selectedDistrict === "All Districts") return null;
    return stateData.districts.find((d) => d.name === selectedDistrict) || null;
  }, [stateData, selectedDistrict]);

  // Dynamically compute summary metrics based on selected state + district + category
  const dynamicMetrics = React.useMemo<DemographicMetric[]>(() => {
    const pop = districtData ? `${districtData.populationMln} Million` : `${stateData.totalPopulationMln} Million`;
    const hh = districtData ? `${districtData.householdsMln} Million` : `${stateData.totalHouseholdsMln} Million`;
    const lit = districtData ? `${districtData.literacyRatePct}%` : `${stateData.literacyRatePct}%`;
    const growth = districtData ? `+${districtData.growthRatePct}%` : `+${stateData.growthRatePct}%`;
    const urban = districtData ? `${districtData.urbanPct}%` : `${stateData.urbanPct}%`;
    const rural = districtData ? `${districtData.ruralPct}%` : `${stateData.ruralPct}%`;
    const sexRatioVal = districtData ? `${districtData.sexRatio} F / 1k M` : `${stateData.sexRatio} F / 1k M`;


    return [
      {
        id: "metric-tot-pop",
        label: t("insights.totalPopulation"),
        value: pop,
        change: `${growth} growth`,
        changeType: "increase",
        description: `Estimated population count for ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState} (Demo Data).`,
        category: "population",
        iconType: "population",
      },
      {
        id: "metric-tot-hh",
        label: t("insights.totalHouseholds"),
        value: hh,
        change: "Census Listed",
        changeType: "increase",
        description: `Occupied census households in ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}.`,
        category: "households",
        iconType: "households",
      },
      {
        id: "metric-lit-rate",
        label: t("insights.literacyRate"),
        value: lit,
        change: "Aged 7+ Effective",
        changeType: "increase",
        description: `Combined effective literacy rate in ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}.`,
        category: "literacy",
        iconType: "literacy",
      },
      {
        id: "metric-pop-growth",
        label: selectedCategory === "gender" ? "Sex Ratio" : selectedCategory === "urban_rural" ? "Urban Share" : "Population Growth",
        value: selectedCategory === "gender" ? sexRatioVal : selectedCategory === "urban_rural" ? urban : growth,
        change: selectedCategory === "urban_rural" ? `${rural} Rural` : "Decadal estimate",
        changeType: "neutral",
        description: selectedCategory === "gender"
          ? `Females per 1,000 males in ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}.`
          : selectedCategory === "urban_rural"
          ? `Share of urban population residing in towns and cities.`
          : `Annualized demographic rate across ${selectedState}.`,
        category: selectedCategory,
        iconType: selectedCategory === "gender" ? "gender" : selectedCategory === "urban_rural" ? "urban_rural" : "growth",
      },
    ];
  }, [stateData, districtData, selectedState, selectedDistrict, selectedCategory]);

  // Derive chart data for the two live charts
  const activeAgeGroups = React.useMemo(() => {
    // Use district-level ageGroups if available, otherwise fall back to state-level
    if (districtData && districtData.ageGroups && districtData.ageGroups.length > 0) {
      return districtData.ageGroups;
    }
    return stateData.ageGroups;
  }, [districtData, stateData]);

  const activeUrbanPct = districtData ? districtData.urbanPct : stateData.urbanPct;
  const activeRuralPct = districtData ? districtData.ruralPct : stateData.ruralPct;
  const activeLocationLabel = selectedDistrict !== "All Districts" ? `${selectedDistrict} (${selectedState})` : selectedState;


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

      {/* 4. Active Context Banner */}
      <div className="p-4 rounded-2xl bg-brand-navy-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-brand-navy-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-saffron-500/20 border border-brand-saffron-400/40 text-brand-saffron-300 flex items-center justify-center font-black text-base shadow-2xs">
            {selectedState.charAt(0)}
          </div>
          <div>
            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-1.5">
              <span>{t("insights.activeContext")}</span>
              <strong className="text-white font-bold px-2 py-0.5 rounded bg-brand-navy-800 border border-brand-navy-700">
                {selectedState}
              </strong>
              <span>&bull; {t("insights.district")}</span>
              <strong className="text-white font-bold px-2 py-0.5 rounded bg-brand-navy-800 border border-brand-navy-700">
                {selectedDistrict}
              </strong>
            </div>
            <div className="text-xs text-brand-saffron-300 font-medium mt-0.5">
              {t("insights.categoryView")} <span className="capitalize font-bold text-brand-saffron-200">{selectedCategory.replace("_", " ")}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-300 flex items-center gap-2 bg-brand-navy-950/60 px-3 py-1.5 rounded-xl border border-brand-navy-800">
          <Info className="h-4 w-4 text-brand-saffron-400 shrink-0" />
          <span>{t("insights.showingData")} {selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}</span>
        </div>
      </div>

      {/* 3. Summary Metric Cards (4-grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {selectedDistrict !== "All Districts" ? `${selectedDistrict} (${selectedState})` : selectedState} {t("insights.keyMetrics")}
          </h3>
          <span className="text-xs text-slate-500 font-mono">{t("insights.dynamicData")}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {dynamicMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* 4. Data Insight Sections (Dynamic Visual Emphasis Chart Containers) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Demographic Visualization Containers & Categorical Emphasis
          </h3>
          <span className="text-xs text-slate-500">Interactive Visual Layout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Container 1: Population Distribution */}
          <ChartContainer
            title={`Population Distribution — ${selectedState}`}
            subtitle={`Age-group share for ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState} (+${districtData?.growthRatePct || stateData.growthRatePct}% decadal growth)`}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            categoryBadge="Population"
            className={cn(
              selectedCategory === "population"
                ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50/20 shadow-md"
                : "opacity-90"
            )}
          >
            <PopulationChart
              ageGroups={activeAgeGroups}
              locationLabel={activeLocationLabel}
            />
          </ChartContainer>

          <ChartContainer
            title={`Urban vs Rural Split — ${selectedState}`}
            subtitle={`Statutory towns vs rural habitation breakdown for ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}`}
            icon={<Building className="h-5 w-5 text-amber-600" />}
            categoryBadge="Urban vs Rural"
            className={cn(
              selectedCategory === "urban_rural"
                ? "ring-2 ring-amber-500 border-amber-300 bg-amber-50/20 shadow-md"
                : "opacity-90"
            )}
          >
            <UrbanRuralChart
              urbanPct={activeUrbanPct}
              ruralPct={activeRuralPct}
              locationLabel={activeLocationLabel}
            />
          </ChartContainer>


          {/* Container 3: Literacy Overview */}
          <ChartContainer
            title={`Literacy Overview — ${selectedState}`}
            subtitle={`Effective literacy rate (${districtData?.literacyRatePct || stateData.literacyRatePct}%) & educational levels for ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}`}
            icon={<BookOpen className="h-5 w-5 text-purple-600" />}
            categoryBadge="Literacy"
            className={cn(
              selectedCategory === "literacy"
                ? "ring-2 ring-purple-500 border-purple-300 bg-purple-50/20 shadow-md"
                : "opacity-90"
            )}
          >
            <LiteracyChart
              overallPct={districtData?.literacyRatePct || stateData.literacyRatePct}
              malePct={districtData?.maleLiteracyPct || stateData.maleLiteracyPct}
              femalePct={districtData?.femaleLiteracyPct || stateData.femaleLiteracyPct}
              locationLabel={activeLocationLabel}
            />
          </ChartContainer>

          {/* Container 4: Gender Distribution */}
          <ChartContainer
            title={`Gender Distribution — ${selectedState}`}
            subtitle={`Sex ratio (${districtData?.sexRatio || stateData.sexRatio} F / 1,000 M) & child sex ratio for ${selectedDistrict !== "All Districts" ? selectedDistrict : selectedState}`}
            icon={<Users2 className="h-5 w-5 text-pink-600" />}
            categoryBadge="Gender"
            className={cn(
              selectedCategory === "gender"
                ? "ring-2 ring-pink-500 border-pink-300 bg-pink-50/20 shadow-md"
                : "opacity-90"
            )}
          >
            <GenderChart
              sexRatio={districtData?.sexRatio || stateData.sexRatio}
              malePct={districtData?.malePct || stateData.malePct}
              femalePct={districtData?.femalePct || stateData.femalePct}
              locationLabel={activeLocationLabel}
            />
          </ChartContainer>
        </div>
      </div>

      {/* Existing Detailed Interactive Charts Component */}
      <DemographicCharts />
    </div>
  );
}
