import * as React from "react";
import Link from "next/link";
import { Lock, Bot, Shield, Globe2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TrustPrivacyBanner() {
  const trustPillars = [
    {
      icon: Lock,
      title: "Privacy-Focused Architecture",
      description:
        "Built strictly adhering to the spirit of Section 15 of the Census Act, ensuring individual responses remain confidential and non-disclosable.",
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
    },
    {
      icon: Bot,
      title: "AI Assistance with User Control",
      description:
        "Citizens retain full control over their inputs. GenAI acts purely as an assistive explanation and verification layer without automated data submissions.",
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
    },
    {
      icon: Shield,
      title: "Myth Detection & Fact Verification",
      description:
        "Active mythbuster verification engine protects citizens from common scams, phishing attempts, and false claims regarding documentation requirements.",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    },
    {
      icon: Globe2,
      title: "Accessible Indian Languages",
      description:
        "Designed to bridge digital divides with native language support across major Indian scripts, ensuring intuitive understanding for every citizen.",
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Trust Container Card */}
        <div className="bg-gradient-to-br from-slate-900 via-brand-navy-950 to-slate-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden border border-slate-800">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-navy-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Section */}
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-brand-green-400">
              <Shield className="h-3.5 w-3.5" />
              <span>Transparent & Citizen-First</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Your Privacy Matters
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Census data powers national planning and inclusive welfare distribution. We are dedicated to ensuring every citizen understands their rights, legal protections, and how their data is safeguarded.
            </p>
          </div>

          {/* 4 Trust Indicator Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 relative z-10">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-sm space-y-3 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center border ${pillar.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Prototype Disclosure & Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-3 text-xs text-slate-400 max-w-xl">
              <AlertCircle className="h-5 w-5 text-brand-saffron-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-200">Prototype Notice:</strong> CensusAI Connect is a hackathon proof-of-concept for digital census interactions. It does not collect official census filings or represent an official government agency.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/mythbuster">
                <Button variant="secondary" size="md" className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700">
                  <Shield className="h-4 w-4 mr-1.5 text-brand-saffron-400" />
                  Explore Mythbuster
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
