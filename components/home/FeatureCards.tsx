"use client";

import * as React from "react";
import Link from "next/link";
import {
  Home,
  Calendar,
  FileEdit,
  Bot,
  ShieldCheck,
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/LanguageProvider";

interface FeatureCardsProps {
  onOpenAI: (prompt?: string) => void;
}

export function FeatureCards({ onOpenAI }: FeatureCardsProps) {
  const { t } = useLanguage();

  const features = [
    {
      id: "understand",
      icon: Home,
      title: t("home.features.selfEnum.title"),
      description: t("home.features.selfEnum.desc"),
      href: "/about",
      badge: "Phase 1 & 2",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      accent: "hover:border-blue-300",
      gradient: "from-blue-500/10 via-transparent to-transparent",
    },
    {
      id: "schedule",
      icon: Calendar,
      title: t("home.features.schedule.title"),
      description: t("home.features.schedule.desc"),
      href: "/schedule",
      badge: "State Lookup",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      accent: "hover:border-amber-300",
      gradient: "from-amber-500/10 via-transparent to-transparent",
    },
    {
      id: "self-enum",
      icon: FileEdit,
      title: t("home.features.selfEnum.title"),
      description: t("home.features.selfEnum.desc"),
      href: "/self-enumeration",
      badge: "Digital First",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
      accent: "hover:border-emerald-300",
      gradient: "from-emerald-500/10 via-transparent to-transparent",
    },
    {
      id: "ai-assistant",
      icon: Bot,
      title: t("home.features.aiAssistant.title"),
      description: t("home.features.aiAssistant.desc"),
      onClick: () => onOpenAI("How can CensusAI help me fill my census details?"),
      badge: "GenAI Powered",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
      accent: "hover:border-purple-300",
      gradient: "from-purple-500/10 via-transparent to-transparent",
    },
    {
      id: "mythbuster",
      icon: ShieldCheck,
      title: t("home.features.mythbuster.title"),
      description: t("home.features.mythbuster.desc"),
      href: "/mythbuster",
      badge: "Fact Checker",
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
      accent: "hover:border-rose-300",
      gradient: "from-rose-500/10 via-transparent to-transparent",
    },
    {
      id: "insights",
      icon: BarChart3,
      title: t("home.features.dataInsights.title"),
      description: t("home.features.dataInsights.desc"),
      href: "/data-insights",
      badge: "Interactive",
      iconBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
      accent: "hover:border-cyan-300",
      gradient: "from-cyan-500/10 via-transparent to-transparent",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy-50 text-brand-navy-900 text-xs font-semibold border border-brand-navy-100 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-brand-saffron-500" />
            <span>{t("common.getStarted")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("home.features.title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t("home.features.subtitle")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item) => {
            const Icon = item.icon;

            const cardInner = (
              <div className="p-7 flex flex-col justify-between h-full relative overflow-hidden group">
                {/* Subtle gradient hover wash */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                    item.gradient
                  )}
                />

                <div className="relative z-10 space-y-4">
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center border shadow-2xs group-hover:scale-110 transition-transform duration-200",
                        item.iconBg
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy-900 transition-colors flex items-center gap-1.5">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Indicator */}
                <div className="relative z-10 pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-navy-700 group-hover:text-brand-navy-900">
                  <span>Explore Feature</span>
                  <div className="h-7 w-7 rounded-lg bg-slate-50 group-hover:bg-brand-navy-900 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="block h-full focus:outline-none">
                  <Card
                    hoverEffect
                    className={cn(
                      "h-full border-slate-200/90 transition-all duration-300",
                      item.accent
                    )}
                  >
                    {cardInner}
                  </Card>
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="w-full text-left h-full focus:outline-none cursor-pointer"
              >
                <Card
                  hoverEffect
                  className={cn(
                    "h-full border-slate-200/90 transition-all duration-300",
                    item.accent
                  )}
                >
                  {cardInner}
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
