import { describe, it, expect } from "vitest";
import { MYTHS_DATA, searchMyths } from "@/data/mythsData";

describe("Mythbuster & Grounded Knowledge Base", () => {
  it("contains verified myths with verdicts and safety guidance", () => {
    expect(MYTHS_DATA.length).toBeGreaterThanOrEqual(10);

    for (const myth of MYTHS_DATA) {
      expect(myth.id).toBeDefined();
      expect(myth.myth).toBeTruthy();
      expect(["false", "misleading", "needs_verification"]).toContain(myth.verdict);
      expect(myth.explanation).toBeTruthy();
      expect(myth.keywords.length).toBeGreaterThan(0);
    }
  });

  it("finds OTP and bank fraud myths accurately via search keyword", () => {
    const otpResults = searchMyths("OTP", "All");
    expect(otpResults.length).toBeGreaterThan(0);
    expect(otpResults[0].category).toBe("fraud");
    expect(otpResults[0].verdict).toBe("false");

    const bankResults = searchMyths("bank account", "All");
    expect(bankResults.length).toBeGreaterThan(0);
    expect(bankResults.some((m) => m.category === "fraud" || m.category === "privacy")).toBe(true);
  });

  it("filters myths by category accurately", () => {
    const privacyMyths = searchMyths("", "privacy");
    expect(privacyMyths.length).toBeGreaterThan(0);
    for (const m of privacyMyths) {
      expect(m.category).toBe("privacy");
    }

    const fraudMyths = searchMyths("", "fraud");
    expect(fraudMyths.length).toBeGreaterThan(0);
    for (const m of fraudMyths) {
      expect(m.category).toBe("fraud");
    }
  });

  it("returns empty array for completely unrelated query without matching myths", () => {
    const randomResults = searchMyths("chocolate chip cookies recipe 12345", "All");
    expect(randomResults.length).toBe(0);
  });
});
