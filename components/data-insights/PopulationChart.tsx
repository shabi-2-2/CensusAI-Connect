"use client";

import * as React from "react";
import { AgeGroupData } from "@/types/insights";

interface PopulationChartProps {
  ageGroups: AgeGroupData[];
  locationLabel: string;
}

const BAR_COLORS = [
  { fill: "#4F86C6", label: "0–14" },
  { fill: "#6C63B4", label: "15–24" },
  { fill: "#F4845F", label: "25–44" },
  { fill: "#F2A03D", label: "45–59" },
  { fill: "#57BA9A", label: "60+" },
];

export function PopulationChart({ ageGroups, locationLabel }: PopulationChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const maxPct = Math.max(...ageGroups.map((g) => g.pct), 1);

  // SVG layout constants
  const chartH = 160;
  const barGroupW = 52;
  const gap = 12;
  const totalBars = ageGroups.length;
  const svgW = totalBars * (barGroupW + gap) - gap;
  const labelH = 24;
  const paddingTop = 24; // room for value labels above bars

  return (
    <div className="w-full space-y-4">
      {/* Chart SVG */}
      <div className="w-full overflow-x-auto" role="img" aria-label={`Age group population distribution for ${locationLabel}`}>
        <svg
          viewBox={`0 0 ${svgW} ${chartH + labelH + paddingTop}`}
          className="w-full min-w-[280px]"
          style={{ overflow: "visible" }}
        >
          {/* Gridlines */}
          {[0, 25, 50, 75, 100].map((pctLine) => {
            if (pctLine > maxPct + 5) return null;
            const y = paddingTop + chartH - (pctLine / maxPct) * chartH;
            return (
              <g key={pctLine}>
                <line
                  x1={0}
                  x2={svgW}
                  y1={y}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth={1}
                  strokeDasharray={pctLine === 0 ? "none" : "4 3"}
                />
                {pctLine > 0 && (
                  <text
                    x={-4}
                    y={y + 4}
                    textAnchor="end"
                    fontSize={9}
                    fill="#94A3B8"
                    fontFamily="monospace"
                  >
                    {pctLine}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Bars */}
          {ageGroups.map((group, i) => {
            const x = i * (barGroupW + gap);
            const barH = (group.pct / maxPct) * chartH;
            const barY = paddingTop + chartH - barH;
            const color = BAR_COLORS[i % BAR_COLORS.length];
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={group.group}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Bar background (track) */}
                <rect
                  x={x}
                  y={paddingTop}
                  width={barGroupW}
                  height={chartH}
                  rx={6}
                  fill="#F8FAFC"
                  stroke="#E2E8F0"
                  strokeWidth={1}
                />

                {/* Filled bar */}
                <rect
                  x={x}
                  y={barY}
                  width={barGroupW}
                  height={barH}
                  rx={6}
                  fill={color.fill}
                  opacity={isHovered ? 1 : 0.82}
                  style={{
                    transition: "opacity 0.15s ease, y 0.35s ease, height 0.35s ease",
                    filter: isHovered ? `drop-shadow(0 2px 8px ${color.fill}88)` : "none",
                  }}
                />

                {/* Value label above bar */}
                <text
                  x={x + barGroupW / 2}
                  y={barY - 5}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={isHovered ? "700" : "600"}
                  fill={isHovered ? color.fill : "#475569"}
                  fontFamily="system-ui, sans-serif"
                >
                  {group.pct}%
                </text>

                {/* Age group label below */}
                <text
                  x={x + barGroupW / 2}
                  y={paddingTop + chartH + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#64748B"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {group.group}
                </text>

                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={x + barGroupW / 2 - 46}
                      y={barY - 44}
                      width={92}
                      height={32}
                      rx={8}
                      fill="#1E293B"
                      opacity={0.95}
                    />
                    <text
                      x={x + barGroupW / 2}
                      y={barY - 28}
                      textAnchor="middle"
                      fontSize={10}
                      fill="white"
                      fontWeight="600"
                      fontFamily="system-ui, sans-serif"
                    >
                      Age {group.group}
                    </text>
                    <text
                      x={x + barGroupW / 2}
                      y={barY - 16}
                      textAnchor="middle"
                      fontSize={10}
                      fill="#94A3B8"
                      fontFamily="monospace"
                    >
                      {group.pct}% of population
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center pt-1">
        {ageGroups.map((group, i) => {
          const color = BAR_COLORS[i % BAR_COLORS.length];
          return (
            <div
              key={group.group}
              className="flex items-center gap-1.5 text-xs text-slate-600 font-medium"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm shrink-0"
                style={{ background: color.fill }}
              />
              Age {group.group}
            </div>
          );
        })}
      </div>

      {/* Y-axis label hint */}
      <div className="text-center text-[10px] text-slate-400 font-mono">
        % share of total population · {locationLabel}
      </div>
    </div>
  );
}
