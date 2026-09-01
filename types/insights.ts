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

export interface DistrictOption {
  id: string;
  name: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  tooltip?: string;
}

