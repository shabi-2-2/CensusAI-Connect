"use client";

import * as React from "react";
import { MessageSquareText, Sparkles, X } from "lucide-react";
import { AIChatPanel } from "./AIChatPanel";
import { cn } from "@/lib/utils";

interface AIAssistantFloatingProps {
  isOpen?: boolean;
  onToggle?: () => void;
  initialPrompt?: string;
}

export function AIAssistantFloating({
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
  initialPrompt: controlledPrompt,
}: AIAssistantFloatingProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const [activePrompt, setActivePrompt] = React.useState<string | undefined>(undefined);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isControlled && controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleClose = () => {
    if (isControlled && controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalIsOpen(false);
    }
    setActivePrompt(undefined);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={handleToggle}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-brand-navy-950 via-brand-navy-900 to-brand-navy-800 text-white font-semibold text-sm shadow-xl hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 border border-brand-navy-700/80 cursor-pointer"
            aria-label="Ask CensusAI"
          >
            {/* Pulsing AI Indicator */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-saffron-500"></span>
            </span>

            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-brand-saffron-400" />
              <span>Ask CensusAI</span>
            </div>

            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-slate-200">
              Assistance
            </span>
          </button>
        )}
      </div>

      {/* Chat Panel Modal / Drawer */}
      <AIChatPanel
        isOpen={isOpen}
        onClose={handleClose}
        initialPrompt={controlledPrompt || activePrompt}
      />
    </>
  );
}
