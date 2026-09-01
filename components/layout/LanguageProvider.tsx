"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SUPPORTED_LANGUAGES, LanguageOption } from "@/data/languagesData";
import { getTranslation, translateWithParams, TranslationKey } from "@/translations";

interface LanguageContextType {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguageState] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("census-ai-lang");
    if (stored) {
      const parsed = SUPPORTED_LANGUAGES.find(l => l.code === stored);
      if (parsed) {
        setSelectedLanguageState(parsed);
      }
    }
  }, []);

  const setSelectedLanguage = useCallback((lang: LanguageOption) => {
    setSelectedLanguageState(lang);
    localStorage.setItem("census-ai-lang", lang.code);
  }, []);

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>) => {
    if (params) {
      return translateWithParams(selectedLanguage.code, key, params);
    }
    return getTranslation(selectedLanguage.code, key);
  }, [selectedLanguage.code]);

  // Prevent hydration mismatch by rendering children without localized text until mounted.
  // Alternatively, render with default 'en' state, which is what we do here (safe for layout).
  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, t }}>
      <div key={selectedLanguage.code} className={!isMounted ? "invisible" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return {
      selectedLanguage: SUPPORTED_LANGUAGES[0],
      setSelectedLanguage: () => {},
      t: (key: TranslationKey) => key,
    };
  }
  return context;
}
