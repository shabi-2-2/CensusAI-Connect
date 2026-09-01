export type PhaseStatus = "active" | "upcoming" | "completed";

export interface StateCensusSchedule {
  id: string;
  stateName: string;
  zone: "North" | "South" | "East" | "West" | "Central" | "North-East" | "UT";
  phase1: {
    startDate: string;
    endDate: string;
    status: PhaseStatus;
    selfEnumerationWindow: string;
  };
  phase2: {
    startDate: string;
    endDate: string;
    status: PhaseStatus;
    selfEnumerationWindow: string;
  };
  helpline: string;
  nodalOffice: string;
  notes?: string;
}
