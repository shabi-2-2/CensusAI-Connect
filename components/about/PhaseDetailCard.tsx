"use client";

import * as React from "react";
import {
  Home,
  Users,
  Building,
  Droplets,
  Sparkles,
  Flame,
  Wifi,
  Globe,
  GraduationCap,
  Briefcase,
  MapPin,
  HeartPulse,
  Clock,
  HelpCircle,
  CheckCircle2,
  Bot,
  ArrowRight,
} from "lucide-react";
import { CensusPhase } from "@/types/census";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface PhaseDetailCardProps {
  phase: CensusPhase;
  onAskAI: (prompt: string) => void;
}

export function PhaseDetailCard({ phase, onAskAI }: PhaseDetailCardProps) {
  const isPhase1 = phase.phaseNumber === 1;

  // Icon mapping
  const getIcon = (name: string) => {
    switch (name) {
      case "Home":
        return <Home className="h-7 w-7 text-blue-600" />;
      case "Users":
        return <Users className="h-7 w-7 text-brand-saffron-600" />;
      case "Building":
        return <Building className="h-5 w-5 text-blue-600" />;
      case "Droplets":
        return <Droplets className="h-5 w-5 text-sky-600" />;
      case "Sparkles":
        return <Sparkles className="h-5 w-5 text-emerald-600" />;
      case "Flame":
        return <Flame className="h-5 w-5 text-orange-600" />;
      case "Wifi":
        return <Wifi className="h-5 w-5 text-indigo-600" />;
      case "Globe":
        return <Globe className="h-5 w-5 text-purple-600" />;
      case "GraduationCap":
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case "Briefcase":
        return <Briefcase className="h-5 w-5 text-amber-600" />;
      case "MapPin":
        return <MapPin className="h-5 w-5 text-rose-600" />;
      case "HeartPulse":
        return <HeartPulse className="h-5 w-5 text-pink-600" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-brand-navy-600" />;
    }
  };

  return (
    <div
      id={phase.id}
      className={cn(
        "bg-white rounded-3xl border shadow-md transition-all duration-300 p-6 sm:p-8 lg:p-10 relative overflow-hidden",
        isPhase1
          ? "border-blue-200/90 hover:border-blue-300"
          : "border-brand-saffron-200/90 hover:border-brand-saffron-300"
      )}
    >
      {/* Top Banner Stripe */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-2",
          isPhase1
            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"
            : "bg-gradient-to-r from-brand-saffron-600 via-amber-500 to-orange-400"
        )}
      />

      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge
              variant={isPhase1 ? "secondary" : "saffron"}
              size="md"
              className="text-xs uppercase font-extrabold tracking-wider"
            >
              Phase {phase.phaseNumber} of 2
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              {phase.tagline}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center border shadow-xs shrink-0",
                isPhase1
                  ? "bg-blue-50 border-blue-200"
                  : "bg-orange-50 border-orange-200"
              )}
            >
              {getIcon(phase.iconName)}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {phase.title}
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">
                {phase.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
          <div className="text-center px-2">
            <div className="text-lg font-black text-slate-900">
              ~{phase.keyQuestionsCount}
            </div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">
              Questions
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center px-2">
            <div className="text-lg font-black text-slate-900 flex items-center gap-1 justify-center">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{phase.estimatedTimeMinutes}m</span>
            </div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">
              Avg Time
            </div>
          </div>
        </div>
      </div>

      {/* Purpose & Impact */}
      <div className="my-6 p-4.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-sm text-slate-700">
        <div className="font-semibold text-slate-900 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand-navy-600" />
          Strategic Purpose & National Impact
        </div>
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
          {phase.purpose}
        </p>
      </div>

      {/* 6 Key Focus Areas Grid */}
      <div className="my-8 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <span>Key Parameters & Information Captured</span>
          <span className="text-xs font-normal text-slate-500">
            ({phase.focusAreas.length} core themes)
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phase.focusAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-2xs transition-all space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {getIcon(area.icon)}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {area.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Questionnaire Preview */}
      <div className="my-8 p-5 rounded-2xl bg-brand-navy-50/40 border border-brand-navy-100/60 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy-900 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-brand-navy-700" />
          <span>Sample Questions Asked During {phase.title}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {phase.sampleQuestions.map((q, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60"
            >
              <span className="font-mono font-bold text-brand-navy-600 shrink-0">
                Q{idx + 1}.
              </span>
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer with Required Button */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand-green-500 shrink-0" />
          <span>Protected under Census Act 1948 Confidentiality</span>
        </div>

        {/* Required Button: Ask AI About Phase 1 / Phase 2 */}
        <Button
          variant={isPhase1 ? "primary" : "saffron"}
          size="md"
          onClick={() => onAskAI(phase.suggestedAIPrompt)}
          className="w-full sm:w-auto shadow-sm"
        >
          <Bot className="h-4 w-4 mr-2 text-brand-saffron-300" />
          Ask AI About Phase {phase.phaseNumber}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
