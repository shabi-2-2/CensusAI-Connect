import { HouseholdExtraction, HouseholdMember } from "@/types/census";

/**
 * Validates and safely parses a raw payload into a structured HouseholdExtraction object.
 * Designed to prevent application crashes from malformed AI output or bad network requests.
 * 
 * @param rawData The unknown payload to validate
 * @returns A safe, guaranteed HouseholdExtraction object
 */
export function validateHouseholdExtraction(rawData: any): HouseholdExtraction {
  // Default safe structure
  const result: HouseholdExtraction = {
    householdCount: null,
    members: [],
    confidence: "low",
    notes: [],
  };

  if (!rawData || typeof rawData !== "object") {
    return result;
  }

  // Safely parse householdCount (must be null or a reasonable positive number)
  if (
    typeof rawData.householdCount === "number" &&
    rawData.householdCount > 0 &&
    rawData.householdCount < 100 // Reasonable upper bound for a single household
  ) {
    result.householdCount = Math.floor(rawData.householdCount);
  }

  // Safely parse confidence level
  if (["high", "medium", "low"].includes(rawData.confidence)) {
    result.confidence = rawData.confidence as "high" | "medium" | "low";
  }

  // Safely parse notes
  if (Array.isArray(rawData.notes)) {
    result.notes = rawData.notes
      .filter((n: any) => typeof n === "string" && n.trim().length > 0)
      .map((n: string) => n.trim());
  }

  // Safely parse members array
  if (Array.isArray(rawData.members)) {
    result.members = rawData.members.reduce((safeMembers: HouseholdMember[], member: any, index: number) => {
      // Ensure member is an object
      if (!member || typeof member !== "object") return safeMembers;

      // Generate a safe ID — Gemini does not produce IDs, so we synthesize one
      const safeId =
        typeof member.id === "string" && member.id.trim()
          ? member.id.trim()
          : `ai-member-${index}-${Date.now()}`;

      // Default relationship if missing or invalid
      const safeRelationship =
        typeof member.relationship === "string" && member.relationship.trim()
          ? member.relationship.trim()
          : "Unknown";

      // Safely parse age
      let safeAge: number | null = null;
      if (typeof member.age === "number" && member.age >= 0 && member.age <= 120) {
        safeAge = Math.floor(member.age);
      }

      // Safely parse gender
      let safeGender: string | null = null;
      if (typeof member.gender === "string" && member.gender.trim()) {
        safeGender = member.gender.trim();
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
