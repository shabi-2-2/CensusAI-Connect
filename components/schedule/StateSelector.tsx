"use client";

import * as React from "react";
import { Search, MapPin, Check } from "lucide-react";
import { STATE_SCHEDULES, CITY_MAPPINGS } from "@/data/scheduleData";
import { StateCensusSchedule } from "@/types/schedule";
import { cn } from "@/lib/utils";

interface StateSelectorProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
}

export function StateSelector({
  selectedStateId,
  onSelectState,
}: StateSelectorProps) {
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedState = STATE_SCHEDULES.find((s) => s.id === selectedStateId);

  // Filter states and matching cities
  const filteredStates = React.useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return STATE_SCHEDULES;

    return STATE_SCHEDULES.filter((s) => {
      const matchState = s.stateName.toLowerCase().includes(term);
      const matchCity = CITY_MAPPINGS.some(
        (c) => c.stateId === s.id && c.cityName.toLowerCase().includes(term)
      );
      return matchState || matchCity;
    });
  }, [search]);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-3" ref={containerRef}>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        Select State or Union Territory
      </label>

      {/* Selector Trigger Input */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-300 rounded-xl shadow-xs text-left focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 hover:border-slate-400 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 text-brand-saffron-600 shrink-0" />
            <span className="font-semibold text-slate-900 text-sm">
              {selectedState ? selectedState.stateName : "Choose a state..."}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-normal">
            {selectedState ? `${selectedState.region} Zone` : ""}
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-30 mt-1.5 w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-2 space-y-2 max-h-80 overflow-y-auto">
            <div className="relative p-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by state or city (e.g. Pune, Delhi, Bihar)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500"
                autoFocus
              />
            </div>

            <div role="listbox" className="space-y-0.5">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => {
                  const isSelected = state.id === selectedStateId;
                  const matchingCities = CITY_MAPPINGS.filter(
                    (c) => c.stateId === state.id
                  ).map((c) => c.cityName);

                  return (
                    <button
                      key={state.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelectState(state.id);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left",
                        isSelected
                          ? "bg-brand-navy-900 text-white font-semibold"
                          : "hover:bg-slate-100 text-slate-800"
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">{state.stateName}</span>
                        {matchingCities.length > 0 && (
                          <span
                            className={cn(
                              "text-[10px]",
                              isSelected ? "text-brand-saffron-200" : "text-slate-400"
                            )}
                          >
                            Cities: {matchingCities.join(", ")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold border",
                            isSelected
                              ? "border-brand-navy-700 bg-brand-navy-800 text-brand-saffron-300"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          )}
                        >
                          {state.region}
                        </span>
                        {isSelected && <Check className="h-4 w-4 text-brand-saffron-400" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  No state or city found matching "{search}".
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
