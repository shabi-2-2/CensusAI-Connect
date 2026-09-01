"use client";

import * as React from "react";

interface UrbanRuralChartProps {
  urbanPct: number;
  ruralPct: number;
  locationLabel: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

const SEGMENTS = [
  { key: "urban", label: "Urban", color: "#4F86C6", glow: "#4F86C6" },
  { key: "rural", label: "Rural", color: "#57BA9A", glow: "#57BA9A" },
] as const;

export function UrbanRuralChart({
  urbanPct,
  ruralPct,
  locationLabel,
}: UrbanRuralChartProps) {
  const [hovered, setHovered] = React.useState<"urban" | "rural" | null>(null);

  const cx = 100;
  const cy = 100;
  const outerR = 76;
  const innerR = 46;
  const strokeW = outerR - innerR;

  const total = urbanPct + ruralPct;
  const urbanAngle = (urbanPct / total) * 360;
  const ruralAngle = (ruralPct / total) * 360;

  const segments = [
    { key: "urban" as const, pct: urbanPct, angle: urbanAngle, startAngle: 0, endAngle: urbanAngle },
    { key: "rural" as const, pct: ruralPct, angle: ruralAngle, startAngle: urbanAngle, endAngle: 360 },
  ];

  const hoveredSeg = hovered ? segments.find((s) => s.key === hovered) : null;
  const hoveredColor = hovered === "urban" ? SEGMENTS[0].color : SEGMENTS[1].color;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Donut SVG */}
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
        {/* SVG donut */}
        <div className="relative shrink-0" style={{ width: 200, height: 200 }}>
          <svg
            viewBox="0 0 200 200"
            width={200}
            height={200}
            role="img"
            aria-label={`Urban vs Rural split for ${locationLabel}: ${urbanPct}% urban, ${ruralPct}% rural`}
          >
            {/* Background ring */}
            <circle
              cx={cx}
              cy={cy}
              r={(outerR + innerR) / 2}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={strokeW}
            />

            {segments.map((seg) => {
              if (seg.angle === 0) return null;
              const isHov = hovered === seg.key;
              const color = seg.key === "urban" ? SEGMENTS[0].color : SEGMENTS[1].color;

              // For a full arc (360) render as circle
              if (seg.angle >= 359.99) {
                return (
                  <circle
                    key={seg.key}
                    cx={cx}
                    cy={cy}
                    r={(outerR + innerR) / 2}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeW + (isHov ? 4 : 0)}
                    opacity={isHov ? 1 : 0.85}
                    onMouseEnter={() => setHovered(seg.key)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: "pointer", transition: "opacity 0.15s, stroke-width 0.15s" }}
                  />
                );
              }

              const midAngle = seg.startAngle + seg.angle / 2;
              const midPt = polarToCartesian(cx, cy, (outerR + innerR) / 2, midAngle);
              const outerPt = polarToCartesian(cx, cy, outerR, midAngle);

              return (
                <g key={seg.key}>
                  {/* Arc path */}
                  <path
                    d={describeArc(cx, cy, (outerR + innerR) / 2, seg.startAngle, seg.endAngle)}
                    fill="none"
                    stroke={color}
                    strokeWidth={isHov ? strokeW + 6 : strokeW}
                    strokeLinecap="round"
                    opacity={isHov ? 1 : 0.82}
                    onMouseEnter={() => setHovered(seg.key)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      cursor: "pointer",
                      transition: "stroke-width 0.15s ease, opacity 0.15s ease",
                      filter: isHov ? `drop-shadow(0 0 8px ${color}99)` : "none",
                    }}
                  />

                  {/* Percentage label on arc */}
                  {seg.angle > 30 && (
                    <text
                      x={outerPt.x}
                      y={outerPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={8}
                      fontWeight="700"
                      fill={color}
                      fontFamily="system-ui, sans-serif"
                      style={{ pointerEvents: "none" }}
                    >
                      {seg.pct}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center label */}
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              fontSize={hoveredSeg ? 22 : 20}
              fontWeight="800"
              fill={hoveredSeg ? hoveredColor : "#1E293B"}
              fontFamily="system-ui, sans-serif"
              style={{ transition: "font-size 0.15s, fill 0.15s" }}
            >
              {hoveredSeg ? `${hoveredSeg.pct}%` : `${total.toFixed(0)}%`}
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              fontSize={9}
              fill={hoveredSeg ? hoveredColor : "#94A3B8"}
              fontFamily="system-ui, sans-serif"
              style={{ transition: "fill 0.15s" }}
            >
              {hoveredSeg
                ? (hoveredSeg.key === "urban" ? "Urban" : "Rural")
                : "total"}
            </text>
            <text
              x={cx}
              y={cy + 24}
              textAnchor="middle"
              fontSize={8}
              fill="#CBD5E1"
              fontFamily="system-ui, sans-serif"
            >
              {hoveredSeg ? "" : locationLabel.split("(")[0].trim()}
            </text>
          </svg>
        </div>

        {/* Stats panel */}
        <div className="flex flex-col gap-3 flex-1 w-full">
          {segments.map((seg) => {
            const colorDef = seg.key === "urban" ? SEGMENTS[0] : SEGMENTS[1];
            const isHov = hovered === seg.key;
            return (
              <div
                key={seg.key}
                className="flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer"
                style={{
                  borderColor: isHov ? colorDef.color : "#E2E8F0",
                  background: isHov ? `${colorDef.color}10` : "white",
                }}
                onMouseEnter={() => setHovered(seg.key)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 font-black text-base"
                  style={{ background: `${colorDef.color}18`, color: colorDef.color }}
                >
                  {seg.key === "urban" ? "🏙" : "🌾"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">{colorDef.label}</span>
                    <span
                      className="text-lg font-black tabular-nums"
                      style={{ color: colorDef.color }}
                    >
                      {seg.pct}%
                    </span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${seg.pct}%`, background: colorDef.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip hint */}
      {hovered && (
        <p className="text-xs text-slate-500 text-center animate-in fade-in">
          {hovered === "urban"
            ? `${urbanPct}% of the population in ${locationLabel} resides in urban towns & cities.`
            : `${ruralPct}% of the population in ${locationLabel} resides in rural areas & village panchayats.`}
        </p>
      )}

      {/* Location label */}
      <div className="text-center text-[10px] text-slate-400 font-mono">
        Urban vs Rural split · {locationLabel} · Prototype Data
      </div>
    </div>
  );
}
