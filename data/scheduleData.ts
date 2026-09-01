import { StateCensusSchedule, CityMapping } from "@/types/schedule";

export const STATE_SCHEDULES: StateCensusSchedule[] = [
  {
    id: "maharashtra",
    stateName: "Maharashtra",
    region: "West",
    phase1Start: "2026-05-01",
    phase1End: "2026-06-15",
    selfEnumerationStart: "2026-05-01",
    selfEnumerationEnd: "2026-05-21",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-22-2026",
    nodalOffice: "Directorate of Census Operations, Mumbai",
    notes: "Special digital census kiosks established in municipal wards.",
  },
  {
    id: "uttar-pradesh",
    stateName: "Uttar Pradesh",
    region: "North",
    phase1Start: "2026-05-16",
    phase1End: "2026-06-30",
    selfEnumerationStart: "2026-05-16",
    selfEnumerationEnd: "2026-06-05",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-52-2026",
    nodalOffice: "Directorate of Census Operations, Lucknow",
    notes: "Door-to-door enumerator field training ongoing.",
  },
  {
    id: "bihar",
    stateName: "Bihar",
    region: "East",
    phase1Start: "2026-05-01",
    phase1End: "2026-06-15",
    selfEnumerationStart: "2026-05-01",
    selfEnumerationEnd: "2026-05-20",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-61-2026",
    nodalOffice: "Directorate of Census Operations, Patna",
    notes: "Assisted self-enumeration desks setup at Panchayat Bhavans.",
  },
  {
    id: "west-bengal",
    stateName: "West Bengal",
    region: "East",
    phase1Start: "2026-06-01",
    phase1End: "2026-07-15",
    selfEnumerationStart: "2026-06-01",
    selfEnumerationEnd: "2026-06-20",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-33-2026",
    nodalOffice: "Directorate of Census Operations, Kolkata",
    notes: "Covers all 23 districts including coastal and tea garden zones.",
  },
  {
    id: "tamil-nadu",
    stateName: "Tamil Nadu",
    region: "South",
    phase1Start: "2026-04-15",
    phase1End: "2026-05-31",
    selfEnumerationStart: "2026-04-15",
    selfEnumerationEnd: "2026-05-05",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "active",
    helpline: "1800-44-2026",
    nodalOffice: "Directorate of Census Operations, Chennai",
    notes: "Tamil language voice-assisted self-enumeration pilot underway.",
  },
  {
    id: "karnataka",
    stateName: "Karnataka",
    region: "South",
    phase1Start: "2026-04-15",
    phase1End: "2026-05-31",
    selfEnumerationStart: "2026-04-15",
    selfEnumerationEnd: "2026-05-05",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "active",
    helpline: "1800-42-2026",
    nodalOffice: "Directorate of Census Operations, Bengaluru",
    notes: "Available in Kannada and English via the official citizen app.",
  },
  {
    id: "kerala",
    stateName: "Kerala",
    region: "South",
    phase1Start: "2026-04-15",
    phase1End: "2026-05-31",
    selfEnumerationStart: "2026-04-15",
    selfEnumerationEnd: "2026-05-05",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "active",
    helpline: "1800-48-2026",
    nodalOffice: "Directorate of Census Operations, Thiruvananthapuram",
    notes: "Akshaya Centers providing assisted digital submission support.",
  },
  {
    id: "gujarat",
    stateName: "Gujarat",
    region: "West",
    phase1Start: "2026-05-01",
    phase1End: "2026-06-15",
    selfEnumerationStart: "2026-05-01",
    selfEnumerationEnd: "2026-05-21",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-27-2026",
    nodalOffice: "Directorate of Census Operations, Gandhinagar",
    notes: "Demonstration centers set up at Gram Panchayat e-Seva kendras.",
  },
  {
    id: "delhi",
    stateName: "Delhi (NCT)",
    region: "UT",
    phase1Start: "2026-04-01",
    phase1End: "2026-05-15",
    selfEnumerationStart: "2026-04-01",
    selfEnumerationEnd: "2026-04-20",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "active",
    helpline: "1800-11-2026",
    nodalOffice: "Directorate of Census Operations, Delhi",
    notes: "Online self-enumeration portal open for all 11 districts.",
  },
  {
    id: "rajasthan",
    stateName: "Rajasthan",
    region: "North",
    phase1Start: "2026-05-16",
    phase1End: "2026-06-30",
    selfEnumerationStart: "2026-05-16",
    selfEnumerationEnd: "2026-06-05",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-14-2026",
    nodalOffice: "Directorate of Census Operations, Jaipur",
    notes: "Early scheduling planned for remote desert tehsils.",
  },
  {
    id: "telangana",
    stateName: "Telangana",
    region: "South",
    phase1Start: "2026-04-01",
    phase1End: "2026-05-15",
    selfEnumerationStart: "2026-04-01",
    selfEnumerationEnd: "2026-04-20",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "active",
    helpline: "1800-40-2026",
    nodalOffice: "Directorate of Census Operations, Hyderabad",
    notes: "Integrated with GHMC citizen digital touchpoints.",
  },
  {
    id: "assam",
    stateName: "Assam",
    region: "North-East",
    phase1Start: "2026-06-01",
    phase1End: "2026-07-15",
    selfEnumerationStart: "2026-06-01",
    selfEnumerationEnd: "2026-06-20",
    phase2Start: "2027-02-09",
    phase2End: "2027-02-28",
    status: "upcoming",
    helpline: "1800-36-2026",
    nodalOffice: "Directorate of Census Operations, Guwahati",
    notes: "Multilingual questionnaires available in Assamese, Bodo, Bengali.",
  },
];

export const CITY_MAPPINGS: CityMapping[] = [
  { cityName: "Pune", stateId: "maharashtra", stateName: "Maharashtra" },
  { cityName: "Mumbai", stateId: "maharashtra", stateName: "Maharashtra" },
  { cityName: "Nagpur", stateId: "maharashtra", stateName: "Maharashtra" },
  { cityName: "Delhi", stateId: "delhi", stateName: "Delhi (NCT)" },
  { cityName: "New Delhi", stateId: "delhi", stateName: "Delhi (NCT)" },
  { cityName: "Bengaluru", stateId: "karnataka", stateName: "Karnataka" },
  { cityName: "Bangalore", stateId: "karnataka", stateName: "Karnataka" },
  { cityName: "Mysuru", stateId: "karnataka", stateName: "Karnataka" },
  { cityName: "Chennai", stateId: "tamil-nadu", stateName: "Tamil Nadu" },
  { cityName: "Coimbatore", stateId: "tamil-nadu", stateName: "Tamil Nadu" },
  { cityName: "Kolkata", stateId: "west-bengal", stateName: "West Bengal" },
  { cityName: "Patna", stateId: "bihar", stateName: "Bihar" },
  { cityName: "Gaya", stateId: "bihar", stateName: "Bihar" },
  { cityName: "Lucknow", stateId: "uttar-pradesh", stateName: "Uttar Pradesh" },
  { cityName: "Kanpur", stateId: "uttar-pradesh", stateName: "Uttar Pradesh" },
  { cityName: "Varanasi", stateId: "uttar-pradesh", stateName: "Uttar Pradesh" },
  { cityName: "Noida", stateId: "uttar-pradesh", stateName: "Uttar Pradesh" },
  { cityName: "Jaipur", stateId: "rajasthan", stateName: "Rajasthan" },
  { cityName: "Jodhpur", stateId: "rajasthan", stateName: "Rajasthan" },
  { cityName: "Kochi", stateId: "kerala", stateName: "Kerala" },
  { cityName: "Thiruvananthapuram", stateId: "kerala", stateName: "Kerala" },
  { cityName: "Ahmedabad", stateId: "gujarat", stateName: "Gujarat" },
  { cityName: "Surat", stateId: "gujarat", stateName: "Gujarat" },
  { cityName: "Hyderabad", stateId: "telangana", stateName: "Telangana" },
  { cityName: "Guwahati", stateId: "assam", stateName: "Assam" },
];

/**
 * Deterministic location extraction from user text input.
 * Matches known city names or state names case-insensitively.
 */
export function resolveLocationFromQuery(query: string): {
  state: StateCensusSchedule | null;
  matchedLocation: string | null;
  locationType: "city" | "state" | null;
} {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return { state: null, matchedLocation: null, locationType: null };
  }

  // 1. Check known cities first
  for (const city of CITY_MAPPINGS) {
    const cityRegex = new RegExp(`\\b${city.cityName.toLowerCase()}\\b`, "i");
    if (cityRegex.test(normalized)) {
      const state = STATE_SCHEDULES.find((s) => s.id === city.stateId) || null;
      return { state, matchedLocation: city.cityName, locationType: "city" };
    }
  }

  // 2. Check state names
  for (const state of STATE_SCHEDULES) {
    // Check main state name (e.g. "Maharashtra", "Delhi", "Uttar Pradesh")
    const cleanStateName = state.stateName.replace(/\s*\([^)]*\)/g, "").toLowerCase();
    const stateRegex = new RegExp(`\\b${cleanStateName}\\b`, "i");
    if (stateRegex.test(normalized)) {
      return { state, matchedLocation: state.stateName, locationType: "state" };
    }
  }

  return { state: null, matchedLocation: null, locationType: null };
}
