"use client";

import * as React from "react";
import Link from "next/link";
import { Shield, Sparkles, Globe, Heart, ArrowUpRight } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/data/languagesData";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-navy-800 border border-slate-700 flex items-center justify-center text-white font-extrabold text-lg">
                CA
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Census<span className="text-brand-navy-400">AI</span> Connect
                </span>
                <p className="text-xs text-slate-400">
                  {t("nav.platformSubtitle")}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t("footer.tagline")}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <Shield className="h-3.5 w-3.5 text-brand-green-400" />
                Privacy Safeguarded
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-brand-saffron-400" />
                AI-Assisted
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                13+ Languages
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Census
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>{t("nav.about")}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/self-enumeration"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>{t("nav.selfEnumeration")}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>{t("nav.schedule")}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/mythbuster"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>{t("nav.mythbuster")}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/data-insights"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>{t("nav.dataInsights")}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Census Topics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Key Topics
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about#phase-1" className="hover:text-white transition-colors">
                  Houselisting Checklist
                </Link>
              </li>
              <li>
                <Link href="/about#phase-2" className="hover:text-white transition-colors">
                  Population Demographics
                </Link>
              </li>
              <li>
                <Link href="/mythbuster#privacy" className="hover:text-white transition-colors">
                  Section 15 Confidentiality
                </Link>
              </li>
              <li>
                <Link href="/self-enumeration#process" className="hover:text-white transition-colors">
                  Online QR Code Verification
                </Link>
              </li>
              <li>
                <Link href="/data-insights" className="hover:text-white transition-colors">
                  Literacy & Amenities Trends
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Multilingual Reach */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Regional Support
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {SUPPORTED_LANGUAGES.slice(0, 8).map((lang) => (
                <span
                  key={lang.code}
                  className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300 border border-slate-700/60"
                >
                  {lang.nativeName}
                </span>
              ))}
              <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400">
                +5 more
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              Citizen assistance is designed to support all Schedule 8 languages.
            </p>
          </div>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <Shield className="h-4 w-4 text-brand-saffron-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Prototype & Demonstration Platform: </span>
              {t("footer.disclaimer")}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            {t("footer.copyright")}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Empowering every citizen with transparent data & AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

