export type DataCategory = "population" | "households" | "literacy" | "gender" | "urban_rural";

export interface DemographicMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "neutral" | "decrease";
  description: string;
  category: DataCategory | "digital" | "housing";
  iconType?: "population" | "households" | "literacy" | "growth" | "gender" | "urban_rural";
}

export interface StateInsight {
  state: string;
  populationEstimateMln: number;
  literacyRatePct: number;
  urbanPct: number;
  ruralPct: number;
  digitalAccessPct: number;
  cleanFuelPct: number;
}

export interface AgeGroupData {
  group: string;   // e.g. "0–14"
  pct: number;     // percentage of total population
}

export interface DistrictData {
  name: string;
  populationMln: number;
  householdsMln: number;
  literacyRatePct: number;
  maleLiteracyPct: number;
  femaleLiteracyPct: number;
  growthRatePct: number;
  urbanPct: number;
  ruralPct: number;
  sexRatio: number; // females per 1000 males
  malePct: number;  // % of population that is male
  femalePct: number; // % of population that is female
  ageGroups?: AgeGroupData[];
}

export interface StateDetailedInsight {
  state: string;
  totalPopulationMln: number;
  totalHouseholdsMln: number;
  literacyRatePct: number;
  maleLiteracyPct: number;
  femaleLiteracyPct: number;
  growthRatePct: number;
  urbanPct: number;
  ruralPct: number;
  sexRatio: number;
  childSexRatio: number;
  malePct: number;
  femalePct: number;
  ageGroups: AgeGroupData[];   // state-level age distribution
  districts: DistrictData[];
}


export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  tooltip?: string;
}

