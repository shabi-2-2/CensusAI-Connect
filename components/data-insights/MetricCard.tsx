import * as React from "react";
import { TrendingUp, Users, BookOpen, Building, Smartphone, ArrowUpRight } from "lucide-react";
import { DemographicMetric } from "@/types/insights";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  metric: DemographicMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getIcon = (category: DemographicMetric["category"]) => {
    switch (category) {
      case "population":
        return <Users className="h-5 w-5 text-blue-600" />;
      case "literacy":
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      case "housing":
        return <Building className="h-5 w-5 text-amber-600" />;
      case "digital":
        return <Smartphone className="h-5 w-5 text-emerald-600" />;
    }
  };

  const getBgColor = (category: DemographicMetric["category"]) => {
    switch (category) {
      case "population":
        return "bg-blue-50 border-blue-100";
      case "literacy":
        return "bg-purple-50 border-purple-100";
      case "housing":
        return "bg-amber-50 border-amber-100";
      case "digital":
        return "bg-emerald-50 border-emerald-100";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center border",
            getBgColor(metric.category)
          )}
        >
          {getIcon(metric.category)}
        </div>
        <Badge variant="success" size="sm">
          <TrendingUp className="h-3 w-3 mr-1" />
          {metric.change}
        </Badge>
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {metric.value}
        </div>
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          {metric.label}
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        {metric.description}
      </p>
    </div>
  );
}
