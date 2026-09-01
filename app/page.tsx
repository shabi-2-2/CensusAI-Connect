"use client";

import * as React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureCards } from "@/components/home/FeatureCards";
import { CensusJourney } from "@/components/home/CensusJourney";
import { TrustPrivacyBanner } from "@/components/home/TrustPrivacyBanner";
import { AIAssistantFloating } from "@/components/ai/AIAssistantFloating";

export default function HomePage() {
  const [isAIOpen, setIsAIOpen] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState<string | undefined>(undefined);

  const handleOpenAI = (prompt?: string) => {
    setAiPrompt(prompt);
    setIsAIOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection onOpenAI={handleOpenAI} />

      {/* 6 Core Feature Cards */}
      <FeatureCards onOpenAI={handleOpenAI} />

      {/* Step-by-Step Census Journey Roadmap */}
      <CensusJourney onOpenAI={handleOpenAI} />

      {/* Trust & Privacy Safeguards Banner */}
      <TrustPrivacyBanner />

      {/* Floating AI Assistant Widget */}
      <AIAssistantFloating
        isOpen={isAIOpen}
        onToggle={() => setIsAIOpen(!isAIOpen)}
        initialPrompt={aiPrompt}
      />
    </div>
  );
}
