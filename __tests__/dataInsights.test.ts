import { describe, it, expect } from "vitest";
import { DETAILED_STATE_DATA, STATE_DISTRICTS_DATA, CATEGORY_OPTIONS } from "@/data/insightsData";

describe("Data Insights & Demographic Calculations", () => {
  it("provides detailed state insights for major Indian states", () => {
    const states = Object.keys(DETAILED_STATE_DATA);
    expect(states.length).toBeGreaterThanOrEqual(10);
    expect(states).toContain("Maharashtra");
    expect(states).toContain("Tamil Nadu");
    expect(states).toContain("Uttar Pradesh");
    expect(states).toContain("Kerala");
    expect(states).toContain("Gujarat");
  });

  it("contains valid district data with demographic breakdowns", () => {
    const mh = DETAILED_STATE_DATA["Maharashtra"];
    expect(mh.totalPopulationMln).toBeGreaterThan(100);
    expect(mh.districts.length).toBeGreaterThan(0);

    const pune = mh.districts.find((d) => d.name === "Pune");
    expect(pune).toBeDefined();
    expect(pune?.populationMln).toBeGreaterThan(0);
    expect(pune?.literacyRatePct).toBeGreaterThan(80);
    expect(pune?.maleLiteracyPct).toBeGreaterThan(pune?.femaleLiteracyPct ?? 0);
  });

  it("ensures urban and rural percentages sum to approximately 100%", () => {
    for (const stateName in DETAILED_STATE_DATA) {
      const state = DETAILED_STATE_DATA[stateName];
      const sum = state.urbanPct + state.ruralPct;
      expect(Math.round(sum)).toBe(100);

      const genderSum = state.malePct + state.femalePct;
      expect(Math.round(genderSum)).toBe(100);
    }
  });

  it("has valid category options for filters", () => {
    expect(CATEGORY_OPTIONS.length).toBe(5);
    const categoryIds = CATEGORY_OPTIONS.map((c) => c.id);
    expect(categoryIds).toContain("population");
    expect(categoryIds).toContain("households");
    expect(categoryIds).toContain("literacy");
    expect(categoryIds).toContain("gender");
    expect(categoryIds).toContain("urban_rural");
  });
});
