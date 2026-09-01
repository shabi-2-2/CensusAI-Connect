import * as React from "react";
import { TrendingUp, Users, Home, BookOpen, Activity, ArrowUpRight, Percent, Users2 } from "lucide-react";
import { DemographicMetric } from "@/types/insights";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  metric: DemographicMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const getIcon = () => {
    switch (metric.iconType) {
      case "population":
        return <Users className="h-5 w-5 text-blue-600" />;
      case "households":
        return <Home className="h-5 w-5 text-emerald-600" />;
      case "literacy":
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      case "growth":
        return <Activity className="h-5 w-5 text-rose-600" />;
      case "gender":
        return <Users2 className="h-5 w-5 text-pink-600" />;
      case "urban_rural":
        return <Percent className="h-5 w-5 text-amber-600" />;
      default:
        return <Users className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (metric.iconType) {
      case "population":
        return "bg-blue-50 border-blue-100 text-blue-700";
      case "households":
        return "bg-emerald-50 border-emerald-100 text-emerald-700";
      case "literacy":
        return "bg-purple-50 border-purple-100 text-purple-700";
      case "growth":
        return "bg-rose-50 border-rose-100 text-rose-700";
      case "gender":
        return "bg-pink-50 border-pink-100 text-pink-700";
      case "urban_rural":
        return "bg-amber-50 border-amber-100 text-amber-700";
      default:
        return "bg-blue-50 border-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between relative overflow-hidden">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border", getBgColor())}>
            {getIcon()}
          </div>
          <Badge variant="success" size="sm" className="font-semibold">
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

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Demo Metric
        </span>
        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-medium border border-amber-200">
          Prototype Data
        </span>
      </div>
    </div>
  );
}
