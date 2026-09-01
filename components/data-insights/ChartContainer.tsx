"use client";

import * as React from "react";
import { BarChart2, PieChart, Layers, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  categoryBadge?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  subtitle,
  icon,
  categoryBadge,
  children,
  className,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 flex flex-col justify-between transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="space-y-4">
        {/* Container Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {icon || <BarChart2 className="h-4 w-4 text-brand-saffron-600" />}
              <h4 className="text-lg font-bold text-slate-900 leading-snug">{title}</h4>
            </div>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>

          {categoryBadge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
              {categoryBadge}
            </span>
          )}
        </div>

        {/* Content Body / Chart Placeholder */}
        <div>{children}</div>
      </div>

      {/* Footer Tag */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Info className="h-3 w-3 text-slate-400" />
          Prototype Analytics Container
        </span>
        <span className="font-mono text-[10px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
          Interactive Visualization
        </span>
      </div>
    </div>
  );
}
