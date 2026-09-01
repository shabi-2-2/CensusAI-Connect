export type PhaseStatus = "active" | "upcoming" | "completed";

export interface StateCensusSchedule {
  id: string;
  stateName: string;
  region: "North" | "South" | "East" | "West" | "Central" | "North-East" | "UT";
  // Standardized ISO date fields
  phase1Start: string; // e.g. "2026-04-01"
  phase1End: string;   // e.g. "2026-05-15"
  selfEnumerationStart: string; // e.g. "2026-04-01"
  selfEnumerationEnd: string;   // e.g. "2026-04-20"
  phase2Start: string; // e.g. "2027-02-09"
  phase2End: string;   // e.g. "2027-02-28"
  status: PhaseStatus;
  
  // Optional legacy / display fields
  helpline?: string;
  nodalOffice?: string;
  notes?: string;
}

export interface CityMapping {
  cityName: string;
  stateId: string;
  stateName: string;
}

export type ScheduleQueryIntent =
  | "phase1_dates"
  | "phase2_dates"
  | "self_enumeration_date"
  | "schedule_overview"
  | "missed_deadline"
  | "general_schedule_question";

export interface ScheduleExtractionResult {
  intent: ScheduleQueryIntent;
  location?: string | null;
  state?: string | null;
  confidence?: "high" | "medium" | "low";
}

