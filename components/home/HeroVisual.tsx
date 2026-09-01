"use client";

import * as React from "react";
import { Sparkles, Users, Home, ShieldCheck, Database, Cpu, CheckCircle2, TrendingUp } from "lucide-react";

export function HeroVisual() {
  const [activeNode, setActiveNode] = React.useState<number>(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    {
      title: "Houselisting",
      subtitle: "Phase 1 Housing Frame",
      stat: "330M+ Structures",
      icon: Home,
      color: "from-blue-600 to-indigo-600",
      ringColor: "border-blue-400",
    },
    {
      title: "Population Count",
      subtitle: "Phase 2 Enumeration",
      stat: "1.42B Citizens",
      icon: Users,
      color: "from-brand-saffron-600 to-amber-500",
      ringColor: "border-brand-saffron-400",
    },
    {
      title: "AI Analysis",
      subtitle: "Multilingual Assistance",
      stat: "13+ Languages",
      icon: Cpu,
      color: "from-violet-600 to-purple-600",
      ringColor: "border-purple-400",
    },
    {
      title: "Data Integrity",
      subtitle: "Section 15 Confidentiality",
      stat: "100% Protected",
      icon: ShieldCheck,
      color: "from-emerald-600 to-teal-600",
      ringColor: "border-emerald-400",
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background Glow Blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-navy-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-saffron-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Visual Card */}
      <div className="relative bg-gradient-to-b from-slate-900 via-brand-navy-950 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-white">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#93c5fd 1px, transparent 1px), radial-gradient(#93c5fd 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* Header inside visual card */}
        <div className="relative flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-3 w-3 rounded-full bg-brand-green-400 animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Digital India Census Mesh
            </span>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-800/90 text-brand-saffron-300 border border-slate-700 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-brand-saffron-400" />
            AI Synced
          </span>
        </div>

        {/* Central Connected Network Graphic */}
        <div className="relative my-8 py-4">
          {/* Connecting SVG lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glowing animated paths */}
            <path
              d="M 60 40 Q 200 110 340 40"
              stroke="rgba(59, 130, 246, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 60 180 Q 200 110 340 180"
              stroke="rgba(249, 115, 22, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 60 40 L 200 110 L 60 180"
              stroke="rgba(147, 197, 253, 0.3)"
              strokeWidth="1.5"
            />
            <path
              d="M 340 40 L 200 110 L 340 180"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1.5"
            />

            {/* Central Node Pulse */}
            <circle cx="200" cy="110" r="34" fill="rgba(30, 58, 138, 0.4)" />
            <circle
              cx="200"
              cy="110"
              r="22"
              fill="rgba(59, 130, 246, 0.8)"
              className="animate-pulse"
            />
          </svg>

          {/* Central AI Node Hub */}
          <div className="relative z-10 flex flex-col items-center justify-center my-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-brand-navy-800 to-blue-500 p-0.5 shadow-glow flex items-center justify-center">
              <div className="h-full w-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center">
                <Database className="h-6 w-6 text-brand-saffron-400 animate-pulse" />
                <span className="text-[9px] font-bold text-blue-200 mt-0.5">
                  AI CORE
                </span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[11px] font-semibold text-slate-300">
                Census Knowledge Engine
              </span>
            </div>
          </div>

          {/* 4 Interactive Surrounding Cards */}
          <div className="grid grid-cols-2 gap-3 relative z-10">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isCurrent = activeNode === index;
              return (
                <div
                  key={node.title}
                  onClick={() => setActiveNode(index)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all duration-300 backdrop-blur-md ${
                    isCurrent
                      ? `bg-slate-800/90 ${node.ringColor} shadow-md translate-y-[-2px]`
                      : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-7 w-7 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shadow-xs`}
                    >
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    {isCurrent && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-saffron-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-saffron-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-bold text-white leading-tight">
                      {node.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {node.subtitle}
                    </div>
                    <div className="text-[11px] font-mono font-semibold text-brand-saffron-300 mt-1">
                      {node.stat}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Pill inside visual */}
        <div className="relative pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-brand-green-400" />
            <span>Digital Self-Enumeration Ready</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
            <span>100% Coverage Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}
