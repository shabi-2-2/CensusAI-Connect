import { DemographicMetric, StateInsight, ChartDataPoint, DataCategory } from "@/types/insights";

export interface StateDistrictMap {
  state: string;
  districts: string[];
}

export const STATE_DISTRICTS_DATA: StateDistrictMap[] = [
  {
    state: "Maharashtra",
    districts: ["All Districts", "Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"],
  },
  {
    state: "Uttar Pradesh",
    districts: ["All Districts", "Lucknow", "Kanpur Nagar", "Varanasi", "Agra", "Gautam Buddha Nagar (Noida)", "Prayagraj", "Ghaziabad"],
  },
  {
    state: "Karnataka",
    districts: ["All Districts", "Bengaluru Urban", "Mysuru", "Dakshina Kannada", "Dharwad", "Belagavi", "Tumakuru"],
  },
  {
    state: "Tamil Nadu",
    districts: ["All Districts", "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Kanchipuram"],
  },
  {
    state: "West Bengal",
    districts: ["All Districts", "Kolkata", "North 24 Parganas", "South 24 Parganas", "Howrah", "Darjeeling", "Murshidabad"],
  },
  {
    state: "Bihar",
    districts: ["All Districts", "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"],
  },
  {
    state: "Gujarat",
    districts: ["All Districts", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Gandhinagar"],
  },
  {
    state: "Delhi (NCT)",
    districts: ["All Districts", "New Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
  },
];

export const CATEGORY_OPTIONS: { id: DataCategory; label: string }[] = [
  { id: "population", label: "Population" },
  { id: "households", label: "Households" },
  { id: "literacy", label: "Literacy" },
  { id: "gender", label: "Gender" },
  { id: "urban_rural", label: "Urban vs Rural" },
];

export const SUMMARY_METRIC_CARDS: DemographicMetric[] = [
  {
    id: "metric-tot-pop",
    label: "Total Population",
    value: "112.3 Million",
    change: "+12.1% decadal",
    changeType: "increase",
    description: "Estimated total citizen population count for selected state (Demonstration Data).",
    category: "population",
    iconType: "population",
  },
  {
    id: "metric-tot-hh",
    label: "Total Households",
    value: "24.8 Million",
    change: "+14.2% growth",
    changeType: "increase",
    description: "Total listed occupied residential & mixed-use census households.",
    category: "households",
    iconType: "households",
  },
  {
    id: "metric-lit-rate",
    label: "Literacy Rate",
    value: "82.3%",
    change: "+5.4% since 2011",
    changeType: "increase",
    description: "Overall effective literacy rate for population aged 7 years and above.",
    category: "literacy",
    iconType: "literacy",
  },
  {
    id: "metric-pop-growth",
    label: "Population Growth",
    value: "1.25% p.a.",
    change: "Stabilizing trend",
    changeType: "neutral",
    description: "Annualized demographic growth rate across urban & rural areas.",
    category: "population",
    iconType: "growth",
  },
];

export const KEY_METRICS: DemographicMetric[] = SUMMARY_METRIC_CARDS;

export const POPULATION_DECENNIAL_TREND: ChartDataPoint[] = [
  { label: "1971", value: 548, secondaryValue: 108 },
  { label: "1981", value: 683, secondaryValue: 159 },
  { label: "1991", value: 846, secondaryValue: 217 },
  { label: "2001", value: 1028, secondaryValue: 286 },
  { label: "2011", value: 1210, secondaryValue: 377 },
  { label: "2026 (Est.)", value: 1428, secondaryValue: 502 },
];

export const LITERACY_BY_REGION: ChartDataPoint[] = [
  { label: "Kerala", value: 96.2, secondaryValue: 95.1 },
  { label: "Mizoram", value: 91.3, secondaryValue: 89.4 },
  { label: "Goa", value: 88.7, secondaryValue: 84.7 },
  { label: "Delhi (NCT)", value: 86.2, secondaryValue: 80.8 },
  { label: "Maharashtra", value: 82.3, secondaryValue: 75.9 },
  { label: "Tamil Nadu", value: 80.1, secondaryValue: 73.4 },
  { label: "National Average", value: 79.8, secondaryValue: 70.3 },
  { label: "Rajasthan", value: 66.1, secondaryValue: 52.1 },
  { label: "Bihar", value: 61.8, secondaryValue: 51.5 },
];

export const AMENITIES_PROGRESS_DATA: ChartDataPoint[] = [
  { label: "Electricity Access", value: 97.2, secondaryValue: 67.2 },
  { label: "Sanitation / Latrine", value: 88.6, secondaryValue: 46.9 },
  { label: "Piped Drinking Water", value: 76.4, secondaryValue: 35.5 },
  { label: "Clean Cooking LPG", value: 82.1, secondaryValue: 28.5 },
  { label: "Banking Inclusion", value: 92.4, secondaryValue: 58.7 },
  { label: "Internet Access", value: 68.5, secondaryValue: 8.5 },
];

export const SAMPLE_STATE_INSIGHTS: StateInsight[] = [
  {
    state: "Maharashtra",
    populationEstimateMln: 126.3,
    literacyRatePct: 82.3,
    urbanPct: 45.2,
    ruralPct: 54.8,
    digitalAccessPct: 74.5,
    cleanFuelPct: 84.1,
  },
  {
    state: "Uttar Pradesh",
    populationEstimateMln: 235.6,
    literacyRatePct: 67.7,
    urbanPct: 22.3,
    ruralPct: 77.7,
    digitalAccessPct: 59.2,
    cleanFuelPct: 76.5,
  },
  {
    state: "Karnataka",
    populationEstimateMln: 67.8,
    literacyRatePct: 75.4,
    urbanPct: 38.6,
    ruralPct: 61.4,
    digitalAccessPct: 78.1,
    cleanFuelPct: 86.3,
  },
  {
    state: "Tamil Nadu",
    populationEstimateMln: 76.8,
    literacyRatePct: 80.1,
    urbanPct: 48.4,
    ruralPct: 51.6,
    digitalAccessPct: 79.4,
    cleanFuelPct: 89.2,
  },
  {
    state: "West Bengal",
    populationEstimateMln: 99.1,
    literacyRatePct: 76.3,
    urbanPct: 31.9,
    ruralPct: 68.1,
    digitalAccessPct: 64.0,
    cleanFuelPct: 78.4,
  },
  {
    state: "Kerala",
    populationEstimateMln: 35.8,
    literacyRatePct: 96.2,
    urbanPct: 47.7,
    ruralPct: 52.3,
    digitalAccessPct: 88.6,
    cleanFuelPct: 94.2,
  },
];
