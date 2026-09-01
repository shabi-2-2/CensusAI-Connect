export interface CensusPhase {
  id: "phase-1" | "phase-2";
  phaseNumber: number;
  title: string;
  subtitle: string;
  tagline: string;
  iconName: string;
  focusAreas: {
    title: string;
    description: string;
    icon: string;
  }[];
  keyQuestionsCount: number;
  estimatedTimeMinutes: number;
  sampleQuestions: string[];
  purpose: string;
  importance: string;
  deliverables: string[];
  suggestedAIPrompt: string;
}

export interface StepItem {
  id: number;
  title: string;
  description: string;
  phase: 1 | 2;
  status: "completed" | "current" | "upcoming";
}

export interface HouseholdFormData {
  state: string;
  district: string;
  subDistrict: string;
  censusHouseNumber: string;
  ownershipStatus: "owned" | "rented" | "other";
  dwellingType: "pucca" | "semi-pucca" | "kutcha";
  exclusiveRooms: number;
  marriedCouples: number;
  drinkingWaterSource: string;
  lightingSource: string;
  latrineFacility: string;
  cookingFuel: string;
  hasInternet: boolean;
  hasVehicle: string;
}
