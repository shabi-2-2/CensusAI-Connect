"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageSquareText, Shield, Globe, Users2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";
import { useLanguage } from "@/components/layout/LanguageProvider";

interface HeroSectionProps {
  onOpenAI: (prompt?: string) => void;
}

export function HeroSection({ onOpenAI }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-brand-navy-50/50 via-white to-slate-50/30">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-navy-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-saffron-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Pitch, Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-xs font-semibold border border-brand-navy-200/80 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-brand-saffron-500 animate-pulse" />
              <span>{t("home.hero.badge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              {t("home.hero.title")}{" "}
              <span className="bg-gradient-to-r from-brand-navy-900 via-brand-navy-700 to-brand-saffron-600 bg-clip-text text-transparent">
                {t("home.hero.titleHighlight")}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("home.hero.description")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/self-enumeration">
                <Button variant="saffron" size="lg" className="w-full sm:w-auto shadow-md">
                  <Sparkles className="h-5 w-5 mr-2" />
                  {t("home.hero.ctaStart")}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onOpenAI("Explain how CensusAI can help me with the census process.")}
                className="w-full sm:w-auto border-slate-300 text-slate-800 hover:bg-slate-50 shadow-2xs"
              >
                <MessageSquareText className="h-5 w-5 mr-2 text-brand-navy-700" />
                {t("home.hero.ctaAssistant")}
              </Button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Section 15</div>
                  <div className="text-[11px] text-slate-500">Confidentiality</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-brand-navy-50 text-brand-navy-700 flex items-center justify-center shrink-0 border border-brand-navy-100">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">13+ Languages</div>
                  <div className="text-[11px] text-slate-500">Multilingual AI</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
                  <Users2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1.4B Citizens</div>
                  <div className="text-[11px] text-slate-500">Universal Access</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Element */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
