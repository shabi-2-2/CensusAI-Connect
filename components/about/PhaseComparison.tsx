import * as React from "react";
import { Check, ArrowRight, ShieldCheck, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PhaseComparisonProps {
  onAskAI: (prompt: string) => void;
}

export function PhaseComparison({ onAskAI }: PhaseComparisonProps) {
  const comparisonRows = [
    {
      parameter: "Primary Focus",
      phase1: "Structures, dwellings, amenities & living condition",
      phase2: "Every individual citizen, demographic & economic data",
    },
    {
      parameter: "Unit of Enumeration",
      phase1: "Census House & Household",
      phase2: "Individual Person residing in the household",
    },
    {
      parameter: "Key Information",
      phase1: "Roof/wall materials, drinking water, electricity, toilet, clean fuel, assets",
      phase2: "Age, sex, mother tongue, literacy, occupation, industry, migration, fertility",
    },
    {
      parameter: "Questions Count",
      phase1: "31 standardized parameters",
      phase2: "28 individual demographic questions",
    },
    {
      parameter: "Typical Timeline",
      phase1: "April to September (pre-monsoon rolling window)",
      phase2: "February (synchronous national count across all states)",
    },
    {
      parameter: "Self-Enumeration",
      phase1: "Fill household amenities online prior to enumerator visit",
      phase2: "Verify personal demographics and confirm roster online",
    },
    {
      parameter: "Government Schemes Informed",
      phase1: "PMAY (Housing), Jal Jeevan Mission, Ujjwala (LPG), Saubhagya (Power)",
      phase2: "Parliamentary delimitation, education planning, skill schemes, healthcare",
    },
  ];

  return (
    <div id="comparison" className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 lg:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-navy-600 bg-brand-navy-50 px-2.5 py-1 rounded-md border border-brand-navy-100">
            Side-by-Side Analysis
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            Phase 1 vs. Phase 2 Comparison
          </h3>
          <p className="text-sm text-slate-600">
            Understanding the distinction between housing stock mapping and population counting.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onAskAI("Compare Phase 1 and Phase 2 of India Census and explain why they happen separately.")
          }
          className="shrink-0"
        >
          Ask AI to Compare Both
        </Button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="p-4 font-bold text-slate-900 w-1/4">Parameter</th>
              <th className="p-4 font-bold text-blue-900 bg-blue-50/50 w-[37.5%]">
                <div className="flex items-center gap-1.5">
                  <Home className="h-4 w-4 text-blue-600" />
                  <span>Phase 1: Houselisting</span>
                </div>
              </th>
              <th className="p-4 font-bold text-orange-900 bg-orange-50/50 w-[37.5%]">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-brand-saffron-600" />
                  <span>Phase 2: Population</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-900 bg-slate-50/30">
                  {row.parameter}
                </td>
                <td className="p-4 text-slate-700 leading-relaxed bg-blue-50/10">
                  {row.phase1}
                </td>
                <td className="p-4 text-slate-700 leading-relaxed bg-orange-50/10">
                  {row.phase2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
