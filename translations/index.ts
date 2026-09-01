import en from "./en";
import hi from "./hi";
import mr from "./mr";
import ta from "./ta";
import bn from "./bn";
import { LanguageOption } from "@/data/languagesData";

// Add other languages here if/when created. For now, unsupported ones fallback to English.
const translations: Record<string, Record<string, string>> = {
  en,
  hi,
  mr,
  ta,
  bn,
};

export type TranslationKey = keyof typeof en;

export function getTranslation(langCode: string, key: TranslationKey): string {
  const dictionary = translations[langCode] || translations["en"];
  return dictionary[key] || translations["en"][key] || key;
}

export function translateWithParams(
  langCode: string,
  key: TranslationKey,
  params: Record<string, string | number>
): string {
  let str = getTranslation(langCode, key);
  Object.entries(params).forEach(([k, v]) => {
    str = str.replace(`{${k}}`, String(v));
  });
  return str;
}
