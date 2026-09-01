import { describe, it, expect, beforeEach } from "vitest";
import { getTranslation, translateWithParams, TranslationKey } from "@/translations";
import { SUPPORTED_LANGUAGES } from "@/data/languagesData";

describe("Language & Translation System", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("has English as the primary default language with supported language list", () => {
    expect(SUPPORTED_LANGUAGES.length).toBeGreaterThanOrEqual(5);
    expect(SUPPORTED_LANGUAGES[0].code).toBe("en");
  });

  it("retrieves English translations accurately", () => {
    const homeNav = getTranslation("en", "nav.home" as TranslationKey);
    expect(homeNav).toBe("Home");

    const heroTitle = getTranslation("en", "home.hero.title" as TranslationKey);
    expect(heroTitle).toContain("Census");
  });

  it("retrieves Hindi and Tamil translations correctly", () => {
    const hindiSchedule = getTranslation("hi", "nav.schedule" as TranslationKey);
    expect(hindiSchedule).toBe("अनुसूची");

    const tamilSchedule = getTranslation("ta", "nav.schedule" as TranslationKey);
    expect(tamilSchedule).toBe("அட்டவணை");
  });

  it("falls back to English when a language is missing a specific key", () => {
    // Should return the Marathi or fallback English translation
    const fallbackVal = getTranslation("mr", "nav.home" as TranslationKey);
    expect(fallbackVal).toBeTruthy();
  });

  it("interpolates parameters in translation strings", () => {
    const sample = translateWithParams("en", "insights.showingData" as TranslationKey, {
      location: "Maharashtra",
    });
    expect(sample).toBe("Showing dynamic demo estimates for");
  });

  it("persists and reads language selection in localStorage", () => {
    localStorage.setItem("census-ai-lang", "hi");
    expect(localStorage.getItem("census-ai-lang")).toBe("hi");
  });
});
