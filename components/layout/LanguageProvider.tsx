"use client";

import React, { createContext, useContext, useState } from "react";
import { SUPPORTED_LANGUAGES, LanguageOption } from "@/data/languagesData";

interface LanguageContextType {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return {
      selectedLanguage: SUPPORTED_LANGUAGES[0],
      setSelectedLanguage: () => {},
    };
  }
  return context;
}
