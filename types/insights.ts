export interface DemographicMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "neutral" | "decrease";
  description: string;
  category: "population" | "literacy" | "housing" | "digital";
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

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  tooltip?: string;
}
