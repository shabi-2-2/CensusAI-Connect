import { describe, it, expect } from "vitest";
import { STATE_SCHEDULES, resolveLocationFromQuery } from "@/data/scheduleData";

describe("Schedule & Location Lookup", () => {
  it("contains schedules for major Indian states and Union Territories", () => {
    expect(STATE_SCHEDULES.length).toBeGreaterThanOrEqual(10);

    const maharashtra = STATE_SCHEDULES.find((s) => s.id === "maharashtra");
    expect(maharashtra).toBeDefined();
    expect(maharashtra?.stateName).toBe("Maharashtra");
    expect(maharashtra?.phase1Start).toBeDefined();
    expect(maharashtra?.selfEnumerationStart).toBeDefined();
  });

  it("resolves cities to their correct parent states deterministically", () => {
    const puneResolution = resolveLocationFromQuery("When does census start in Pune?");
    expect(puneResolution.state?.id).toBe("maharashtra");
    expect(puneResolution.matchedLocation).toBe("Pune");
    expect(puneResolution.locationType).toBe("city");

    const chennaiResolution = resolveLocationFromQuery("Tell me dates for Chennai");
    expect(chennaiResolution.state?.id).toBe("tamil-nadu");
    expect(chennaiResolution.matchedLocation).toBe("Chennai");

    const noidaResolution = resolveLocationFromQuery("Census in Noida");
    expect(noidaResolution.state?.id).toBe("uttar-pradesh");
    expect(noidaResolution.matchedLocation).toBe("Noida");
  });

  it("resolves direct state names in query", () => {
    const stateRes = resolveLocationFromQuery("Self-enumeration deadline in Karnataka");
    expect(stateRes.state?.id).toBe("karnataka");
    expect(stateRes.matchedLocation).toBe("Karnataka");
    expect(stateRes.locationType).toBe("state");
  });

  it("handles unknown locations safely without crashing", () => {
    const unknownRes = resolveLocationFromQuery("What is the weather in Atlantis?");
    expect(unknownRes.state).toBeNull();
    expect(unknownRes.matchedLocation).toBeNull();
    expect(unknownRes.locationType).toBeNull();
  });
});
