import { describe, it, expect } from "vitest";
import { validateHouseholdExtraction, sanitizeInput, isValidQuery } from "@/lib/validators";

describe("Self-Enumeration & Extraction Validation", () => {
  it("safely handles null or undefined AI extraction input", () => {
    const result = validateHouseholdExtraction(null);
    expect(result).toEqual({
      householdCount: null,
      members: [],
      confidence: "low",
      notes: [],
    });
  });

  it("validates and parses complete structured household data", () => {
    const rawPayload = {
      householdCount: 4,
      confidence: "high",
      notes: ["Family of four residing in Bengaluru"],
      members: [
        { id: "m1", relationship: "Head / Self", age: 42, gender: "Male" },
        { id: "m2", relationship: "Spouse", age: 39, gender: "Female" },
        { id: "m3", relationship: "Daughter", age: 14, gender: "Female" },
        { id: "m4", relationship: "Son", age: 10, gender: "Male" },
      ],
    };

    const validated = validateHouseholdExtraction(rawPayload);
    expect(validated.householdCount).toBe(4);
    expect(validated.confidence).toBe("high");
    expect(validated.members.length).toBe(4);
    expect(validated.members[0].relationship).toBe("Head / Self");
    expect(validated.members[0].age).toBe(42);
    expect(validated.members[0].gender).toBe("Male");
  });

  it("caps unrealistic household sizes to prevent spoofing", () => {
    const invalidCountPayload = {
      householdCount: 1500, // Invalid extreme value
      confidence: "medium",
      members: [],
    };

    const validated = validateHouseholdExtraction(invalidCountPayload);
    expect(validated.householdCount).toBeNull();
  });

  it("synthesizes safe IDs and relationships if AI omitted them", () => {
    const incompletePayload = {
      householdCount: 2,
      confidence: "low",
      members: [
        { age: 25 }, // missing id, relationship, gender
      ],
    };

    const validated = validateHouseholdExtraction(incompletePayload);
    expect(validated.members.length).toBe(1);
    expect(validated.members[0].id).toContain("ai-member-0-");
    expect(validated.members[0].relationship).toBe("Unknown");
    expect(validated.members[0].age).toBe(25);
    expect(validated.members[0].gender).toBeNull();
  });

  it("sanitizes user input string and rejects non-string queries", () => {
    const dirty = "  Hello \u0000World!  ";
    const cleaned = sanitizeInput(dirty, 50);
    expect(cleaned).toBe("Hello World!");

    expect(isValidQuery("", 1, 100)).toBe(false);
    expect(isValidQuery("   ", 1, 100)).toBe(false);
    expect(isValidQuery("Valid query", 1, 100)).toBe(true);
    expect(isValidQuery("Too long query", 1, 5)).toBe(false);
  });
});
