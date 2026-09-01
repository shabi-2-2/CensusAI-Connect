import { CensusPhase } from "@/types/census";

export const CENSUS_PHASES: CensusPhase[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "Houselisting & Housing Census",
    subtitle: "Mapping Every Dwelling, Structure & Living Condition Across India",
    tagline: "The Blueprint of India's Living Standards",
    iconName: "Home",
    focusAreas: [
      {
        title: "Building Characteristics & Material",
        description: "Predominant material of floor, wall, and roof; condition of the census house (good, livable, dilapidated).",
        icon: "Building",
      },
      {
        title: "Housing & Living Conditions",
        description: "Ownership status (owned/rented), number of dwelling rooms exclusively in possession of the household.",
        icon: "Home",
      },
      {
        title: "Drinking Water & Lighting Facilities",
        description: "Primary source of drinking water, location of source (within premises/near/away), and main source of lighting.",
        icon: "Droplets",
      },
      {
        title: "Sanitation & Drainage System",
        description: "Access to latrine within premises, type of latrine facility, wastewater outlet connectivity to drainage system.",
        icon: "Sparkles",
      },
      {
        title: "Kitchen, Cooking Fuel & LPG",
        description: "Availability of dedicated kitchen, type of fuel used for cooking, and LPG/PNG connection status.",
        icon: "Flame",
      },
      {
        title: "Household Assets & Connectivity",
        description: "Possession of radio/transistor, television, internet access, computer/laptop, telephone/mobile, and motorized vehicles.",
        icon: "Wifi",
      },
    ],
    keyQuestionsCount: 31,
    estimatedTimeMinutes: 12,
    sampleQuestions: [
      "What is the predominant material used for the roof and walls of this house?",
      "How many married couples live in this household?",
      "What is the primary source of drinking water available to the family?",
      "Does the household have access to an individual latrine within the premises?",
      "What type of fuel is primarily used for cooking food?",
      "Does any member of the household have access to broadband or mobile internet?",
    ],
    purpose:
      "To build a comprehensive spatial inventory of all residential and commercial structures in India, evaluating basic civic amenities, housing deficit, and standard of living indicators for developmental policy.",
    importance:
      "Data gathered in Phase 1 directly shapes municipal planning, rural housing initiatives (e.g., PMAY), clean water pipelines (Jal Jeevan Mission), and electrification grids.",
    deliverables: [
      "National Housing Quality Index",
      "Clean Energy & Water Coverage Mapping",
      "Urban vs Rural Infrastructure Index",
      "Census House Numbering Frame for Phase 2",
    ],
    suggestedAIPrompt:
      "Explain Phase 1 (Houselisting & Housing Census) in simple terms and list the documents or details I need ready.",
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    title: "Population Enumeration",
    subtitle: "Counting Every Individual: Demographics, Education, Economic Activity & Culture",
    tagline: "The Human Tapestry of the Nation",
    iconName: "Users",
    focusAreas: [
      {
        title: "Demographic Identifiers & Household Relationship",
        description: "Full name, relationship to head of household, sex, date of birth, age, and current marital status.",
        icon: "Users",
      },
      {
        title: "Social & Cultural Background",
        description: "Mother tongue, other languages spoken, religion, Scheduled Caste / Scheduled Tribe status.",
        icon: "Globe",
      },
      {
        title: "Literacy & Educational Attainment",
        description: "Literacy status, highest educational level attained, school/college attendance status.",
        icon: "GraduationCap",
      },
      {
        title: "Economic Activity & Occupation",
        description: "Main/marginal worker classification, occupation category, industry sector, class of worker, seeking work status.",
        icon: "Briefcase",
      },
      {
        title: "Migration & Place of Last Residence",
        description: "Place of birth, place of last residence, reason for migration (work, marriage, education, family movement).",
        icon: "MapPin",
      },
      {
        title: "Fertility & Vital Statistics",
        description: "Number of children surviving, children ever born, age at marriage for ever-married females.",
        icon: "HeartPulse",
      },
    ],
    keyQuestionsCount: 28,
    estimatedTimeMinutes: 15,
    sampleQuestions: [
      "What is the full name and age of each member usually residing in this household?",
      "What is the mother tongue and any secondary languages spoken fluently?",
      "What is the highest level of education completed by each individual?",
      "Did the individual engage in any economic or agricultural activity in the past 12 months?",
      "What was the primary reason for moving to the current place of residence?",
    ],
    purpose:
      "To obtain an accurate, granular count and socio-economic demographic portrait of every person living within the borders of India at the census reference moment.",
    importance:
      "Population enumeration determines parliamentary constituency delimitation, fiscal devolution to states, affirmative action policies, healthcare resource allocation, and educational program targeting.",
    deliverables: [
      "Total Population Count (State/District/Ward/Village)",
      "Gender Ratio & Age Pyramid Analysis",
      "Workforce Participation & Occupational Profiles",
      "Linguistic & Cultural Demography Atlas",
    ],
    suggestedAIPrompt:
      "What questions are asked in Phase 2 (Population Enumeration), and how is individual privacy protected?",
  },
];
