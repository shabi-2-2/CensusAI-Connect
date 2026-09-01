"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  FileCheck2,
  Bot,
  ShieldCheck,
  LineChart,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CensusJourneyProps {
  onOpenAI: (prompt?: string) => void;
}

export function CensusJourney({ onOpenAI }: CensusJourneyProps) {
  const steps = [
    {
      stepNumber: "01",
      title: "Understand",
      subtitle: "Phases 1 & 2",
      description: "Learn what questions are asked in Houselisting vs Population Enumeration.",
      icon: BookOpen,
      href: "/about",
      color: "bg-blue-600 text-white",
      badgeColor: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      stepNumber: "02",
      title: "Check Schedule",
      subtitle: "State Windows",
      description: "Find exact self-enumeration and field enumerator dates for your state.",
      icon: CalendarDays,
      href: "/schedule",
      color: "bg-amber-600 text-white",
      badgeColor: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      stepNumber: "03",
      title: "Self Enumerate",
      subtitle: "10-Minute Form",
      description: "Fill housing and household info online from the comfort of your home.",
      icon: FileCheck2,
      href: "/self-enumeration",
      color: "bg-emerald-600 text-white",
      badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      stepNumber: "04",
      title: "Get AI Help",
      subtitle: "Instant Answers",
      description: "Ask CensusAI in your regional language if you need clarification on any field.",
      icon: Bot,
      onClick: () => onOpenAI("Help me understand what details I need for self-enumeration."),
      color: "bg-purple-600 text-white",
      badgeColor: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      stepNumber: "05",
      title: "Verify Info",
      subtitle: "Debunk Myths",
      description: "Verify privacy legalities under Section 15 and debunk common rumors.",
      icon: ShieldCheck,
      href: "/mythbuster",
      color: "bg-rose-600 text-white",
      badgeColor: "text-rose-600 bg-rose-50 border-rose-200",
    },
    {
      stepNumber: "06",
      title: "Explore Insights",
      subtitle: "Open Trends",
      description: "Discover national demographics, literacy growth, and housing development data.",
      icon: LineChart,
      href: "/data-insights",
      color: "bg-brand-navy-900 text-white",
      badgeColor: "text-brand-navy-900 bg-brand-navy-50 border-brand-navy-200",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background Subtle Wave */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-saffron-50 text-brand-saffron-700 text-xs font-semibold border border-brand-saffron-200 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-brand-saffron-500" />
            <span>Interactive Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Seamless Census Journey
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Follow these six clear steps to complete and verify your census participation with confidence.
          </p>
        </div>

        {/* Step-by-Step Flow Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden xl:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 via-purple-200 to-brand-navy-200 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              const stepContent = (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col justify-between group">
                  <div>
                    {/* Top Row: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        STEP {step.stepNumber}
                      </span>
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-200",
                          step.color
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-navy-900 transition-colors">
                        {step.title}
                      </h3>
                      <span
                        className={cn(
                          "inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border",
                          step.badgeColor
                        )}
                      >
                        {step.subtitle}
                      </span>
                      <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Arrow Indicator */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-brand-navy-900">
                    <span>{step.href ? "Go to Step" : "Try AI"}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );

              if (step.href) {
                return (
                  <Link key={step.stepNumber} href={step.href} className="block h-full focus:outline-none">
                    {stepContent}
                  </Link>
                );
              }

              return (
                <button
                  key={step.stepNumber}
                  onClick={step.onClick}
                  className="w-full text-left h-full focus:outline-none cursor-pointer"
                >
                  {stepContent}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
