/**
 * lib/validators.ts
 *
 * Type-safe runtime validation helpers for AI responses, user inputs, and API payloads.
 */

import { HouseholdExtraction, HouseholdMember } from "@/types/census";

/**
 * Validates and safely parses a raw payload into a structured HouseholdExtraction object.
 * Designed to prevent application crashes from malformed AI output or bad network requests.
 * 
 * @param rawData The unknown payload to validate
 * @returns A safe, guaranteed HouseholdExtraction object
 */
export function validateHouseholdExtraction(rawData: unknown): HouseholdExtraction {
  const result: HouseholdExtraction = {
    householdCount: null,
    members: [],
    confidence: "low",
    notes: [],
  };

  if (!rawData || typeof rawData !== "object") {
    return result;
  }

  const data = rawData as Record<string, unknown>;

  // Safely parse householdCount (must be positive integer, reasonable bound for a single household)
  if (
    typeof data.householdCount === "number" &&
    data.householdCount > 0 &&
    data.householdCount < 100
  ) {
    result.householdCount = Math.floor(data.householdCount);
  }

  // Safely parse confidence level
  if (data.confidence === "high" || data.confidence === "medium" || data.confidence === "low") {
    result.confidence = data.confidence;
  }

  // Safely parse notes
  if (Array.isArray(data.notes)) {
    result.notes = data.notes
      .filter((n): n is string => typeof n === "string" && n.trim().length > 0)
      .map((n) => n.trim());
  }

  // Safely parse members array
  if (Array.isArray(data.members)) {
    result.members = data.members.reduce<HouseholdMember[]>((safeMembers, member, index) => {
      if (!member || typeof member !== "object") return safeMembers;
      const m = member as Record<string, unknown>;

      const safeId =
        typeof m.id === "string" && m.id.trim()
          ? m.id.trim()
          : `ai-member-${index}-${Date.now()}`;

      const safeRelationship =
        typeof m.relationship === "string" && m.relationship.trim()
          ? m.relationship.trim()
          : "Unknown";

      let safeAge: number | null = null;
      if (typeof m.age === "number" && m.age >= 0 && m.age <= 120) {
        safeAge = Math.floor(m.age);
      }

      let safeGender: string | null = null;
      if (typeof m.gender === "string" && m.gender.trim()) {
        safeGender = m.gender.trim();
      }

      safeMembers.push({
        id: safeId,
        relationship: safeRelationship,
        age: safeAge,
        gender: safeGender,
      });

      return safeMembers;
    }, []);
  }

  return result;
}

/**
 * Sanitizes a string input: trims whitespace and strips unsafe control characters.
 */
export function sanitizeInput(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/**
 * Checks whether an input string contains basic content and meets length requirements.
 */
export function isValidQuery(input: unknown, minLength = 1, maxLength = 1000): boolean {
  if (typeof input !== "string") return false;
  const trimmed = input.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}
