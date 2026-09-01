"use client";

import * as React from "react";
import { Filter, MapPin, Building2, Layers } from "lucide-react";
import { STATE_DISTRICTS_DATA, CATEGORY_OPTIONS } from "@/data/insightsData";
import { DataCategory } from "@/types/insights";

interface InsightFiltersProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  selectedCategory: DataCategory;
  onCategoryChange: (category: DataCategory) => void;
}

export function InsightFilters({
  selectedState,
  onStateChange,
  selectedDistrict,
  onDistrictChange,
  selectedCategory,
  onCategoryChange,
}: InsightFiltersProps) {
  // Find districts for selected state
  const availableDistricts = React.useMemo(() => {
    const match = STATE_DISTRICTS_DATA.find((item) => item.state === selectedState);
    return match ? match.districts : ["All Districts"];
  }, [selectedState]);

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    onStateChange(newState);
    onDistrictChange("All Districts");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <Filter className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Insight Control Panel</h3>
            <p className="text-xs text-slate-500">Filter census statistics by geography and category</p>
          </div>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
          Default: Maharashtra
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* State Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-rose-500" />
            Select State / UT
          </label>
          <select
            value={selectedState}
            onChange={handleStateSelect}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all cursor-pointer"
          >
            {STATE_DISTRICTS_DATA.map((item) => (
              <option key={item.state} value={item.state}>
                {item.state}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-500" />
            Select District
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all cursor-pointer"
          >
            {availableDistricts.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Data Category Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-purple-500" />
            Data Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as DataCategory)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 px-3.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all cursor-pointer"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
