"use client";

import * as React from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { SUPPORTED_LANGUAGES, LanguageOption } from "@/data/languagesData";
import { cn } from "@/lib/utils";

export function LanguageSelector({
  variant = "desktop",
  className,
}: {
  variant?: "desktop" | "mobile";
  className?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageOption>(
    SUPPORTED_LANGUAGES[0]
  );
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className={cn("space-y-2", className)}>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-brand-navy-600" />
          Select Language ({selectedLanguage.nativeName})
        </label>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border text-left transition-colors",
                selectedLanguage.code === lang.code
                  ? "bg-brand-navy-50 border-brand-navy-300 text-brand-navy-900 font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              <span>{lang.nativeName}</span>
              {selectedLanguage.code === lang.code && (
                <Check className="h-3.5 w-3.5 text-brand-navy-600 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-all shadow-2xs hover:border-slate-300"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5 text-brand-navy-600" />
        <span className="font-semibold text-slate-900">
          {selectedLanguage.nativeName}
        </span>
        <span className="text-slate-400 text-[11px]">({selectedLanguage.code.toUpperCase()})</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Available Languages ({SUPPORTED_LANGUAGES.length})
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors",
                  selectedLanguage.code === lang.code
                    ? "bg-brand-navy-50 text-brand-navy-900 font-semibold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div>
                  <div className="font-medium text-slate-900">
                    {lang.nativeName}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang.name}
                  </div>
                </div>
                {selectedLanguage.code === lang.code && (
                  <Check className="h-3.5 w-3.5 text-brand-navy-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
