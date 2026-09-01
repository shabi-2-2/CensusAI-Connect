// English translations — canonical reference for all keys
const en: Record<string, string> = {
  // ─── Navigation ────────────────────────────────────────
  "nav.home": "Home",
  "nav.about": "About Census",
  "nav.selfEnumeration": "Self Enumeration",
  "nav.schedule": "Schedule",
  "nav.mythbuster": "Mythbuster",
  "nav.dataInsights": "Data Insights",
  "nav.startSelfEnumeration": "Start Self Enumeration",
  "nav.platformSubtitle": "India's Digital Census Platform",

  // ─── Common / Shared ───────────────────────────────────
  "common.getStarted": "Get Started",
  "common.learnMore": "Learn More",
  "common.loading": "Loading…",
  "common.back": "Back",
  "common.next": "Next",
  "common.submit": "Submit",
  "common.search": "Search",
  "common.filter": "Filter",
  "common.all": "All",
  "common.error": "Something went wrong. Please try again.",
  "common.noResults": "No results found.",
  "common.prototypeBadge": "Prototype Data",
  "common.demonstrationData": "Demonstration Data",
  "common.poweredBy": "Powered by Gemini AI",

  // ─── Home — Hero ───────────────────────────────────────
  "home.hero.badge": "Census 2026 — Digital India",
  "home.hero.title": "India's Census,",
  "home.hero.titleHighlight": "Made Simple with AI",
  "home.hero.description":
    "CensusAI Connect helps every Indian citizen understand, prepare for, and participate in the 2026 Digital Census — in your language, at your pace.",
  "home.hero.ctaStart": "Start Self Enumeration",
  "home.hero.ctaExplore": "Explore Data Insights",
  "home.hero.ctaAssistant": "Ask CensusAI",
  "home.hero.trustBadge": "Private & Secure",

  // ─── Home — Features ───────────────────────────────────
  "home.features.title": "Everything You Need for Census 2026",
  "home.features.subtitle":
    "From understanding the process to completing your enumeration — CensusAI Connect guides you every step of the way.",
  "home.features.selfEnum.title": "Self Enumeration",
  "home.features.selfEnum.desc":
    "Fill your census form digitally with AI-guided assistance in your preferred language.",
  "home.features.schedule.title": "Schedule Lookup",
  "home.features.schedule.desc":
    "Find census enumeration dates for your state and district using natural language.",
  "home.features.mythbuster.title": "Myth Buster",
  "home.features.mythbuster.desc":
    "Verify census-related claims and protect yourself from misinformation and fraud.",
  "home.features.dataInsights.title": "Data Insights",
  "home.features.dataInsights.desc":
    "Explore demographic trends and census statistics for states and districts across India.",
  "home.features.aiAssistant.title": "AI Assistant",
  "home.features.aiAssistant.desc":
    "Ask any census question in your language and get an accurate, grounded response.",
  "home.features.multilingual.title": "Multilingual Support",
  "home.features.multilingual.desc":
    "Access the platform in English, Hindi, Marathi, Tamil, Bengali, and more Indian languages.",

  // ─── Home — Journey ────────────────────────────────────
  "home.journey.title": "Your Census Journey",
  "home.journey.subtitle": "Four simple steps to complete your 2026 Census",
  "home.journey.step1.title": "Check Your Schedule",
  "home.journey.step1.desc": "Find your state and district enumeration dates.",
  "home.journey.step2.title": "Understand the Process",
  "home.journey.step2.desc": "Learn what questions to expect and your rights.",
  "home.journey.step3.title": "Self Enumerate",
  "home.journey.step3.desc": "Fill your household details with AI guidance.",
  "home.journey.step4.title": "Verify & Submit",
  "home.journey.step4.desc": "Review and confirm your census data.",

  // ─── Home — Trust ──────────────────────────────────────
  "home.trust.title": "Your Privacy is Protected",
  "home.trust.subtitle":
    "Census data is used only for national planning. Your personal information is never shared.",
  "home.trust.badge1": "Data Encrypted",
  "home.trust.badge2": "No Aadhaar Required",
  "home.trust.badge3": "Legally Protected",
  "home.trust.badge4": "Govt. Certified",

  // ─── Schedule ──────────────────────────────────────────
  "schedule.title": "Census Schedule Lookup",
  "schedule.subtitle":
    "Find enumeration dates for your state or district using natural language.",
  "schedule.placeholder": "e.g. When is census in Maharashtra? or मेरे राज्य में जनगणना कब है?",
  "schedule.button": "Find Schedule",
  "schedule.selectState": "Select State / UT",
  "schedule.allStates": "All States",
  "schedule.phase1": "Phase 1 — House Listing",
  "schedule.phase2": "Phase 2 — Population Enumeration",
  "schedule.statusCompleted": "Completed",
  "schedule.statusUpcoming": "Upcoming",
  "schedule.statusOngoing": "Ongoing",
  "schedule.noResults": "No schedule found for the selected location.",
  "schedule.aiPowered": "AI-Powered Schedule Search",
  "schedule.prototypeSafetyNotice":
    "Dates shown are prototype/demonstration data. Always verify with official census authorities.",

  // ─── Mythbuster ────────────────────────────────────────
  "myth.title": "Census Myth Buster",
  "myth.subtitle":
    "Enter a claim or question to verify it against our census knowledge base.",
  "myth.placeholder":
    "e.g. Does the census worker need my OTP? or क्या जनगणना के लिए OTP देना जरूरी है?",
  "myth.button": "Verify Claim",
  "myth.verdict": "Verdict",
  "myth.category": "Category",
  "myth.safetyGuidance": "Safety Guidance",
  "myth.matchType.direct": "Direct Match",
  "myth.matchType.ai": "AI Interpreted",
  "myth.false": "FALSE",
  "myth.misleading": "MISLEADING",
  "myth.needsVerification": "NEEDS VERIFICATION",
  "myth.filterAll": "All Categories",
  "myth.filterPrivacy": "Privacy",
  "myth.filterFraud": "Fraud",
  "myth.filterData": "Data Use",
  "myth.filterEnumeration": "Enumeration",
  "myth.filterEligibility": "Eligibility",
  "myth.loading": "Analysing claim…",
  "myth.noMatch": "No matching myth found in our knowledge base.",
  "myth.searchLabel": "Search myths",
  "myth.prototypeSafetyNotice":
    "This tool is for awareness purposes. Always verify with official census authorities.",
  "myth.sourceLabel": "Source",
  "myth.relatedMyths": "Related Myths",

  // ─── Self Enumeration ──────────────────────────────────
  "selfEnum.title": "Self Enumeration",
  "selfEnum.subtitle": "Complete your census household registration with AI assistance.",
  "selfEnum.step.address": "Address & Location",
  "selfEnum.step.household": "Household Details",
  "selfEnum.step.members": "Household Members",
  "selfEnum.step.review": "Review & Submit",
  "selfEnum.progress": "Step {current} of {total}",
  "selfEnum.back": "Back",
  "selfEnum.next": "Next",
  "selfEnum.submit": "Submit Household",
  "selfEnum.aiHelp": "Describe your household in natural language…",
  "selfEnum.aiButton": "Extract with AI",
  "selfEnum.voiceInput": "Voice Input",
  "selfEnum.prototypeBadge": "Prototype — Demonstration Only",
  "selfEnum.privacyNote":
    "Your data is only used for demonstration purposes and is not submitted anywhere.",

  // ─── Data Insights ─────────────────────────────────────
  "insights.title": "India Census Data Insights",
  "insights.subtitle":
    "Explore demographic and census trends through interactive visualisations.",
  "insights.badge": "Census Intelligence",
  "insights.prototypeBadge": "Prototype Analytics",
  "insights.selectState": "State / UT",
  "insights.selectDistrict": "District",
  "insights.selectCategory": "Data Category",
  "insights.categoryPopulation": "Population",
  "insights.categoryHouseholds": "Households",
  "insights.categoryLiteracy": "Literacy",
  "insights.categoryGender": "Gender",
  "insights.categoryUrbanRural": "Urban vs Rural",
  "insights.activeContext": "Active Context:",
  "insights.district": "District:",
  "insights.categoryView": "Category View:",
  "insights.showingData": "Showing dynamic demo estimates for",
  "insights.keyMetrics": "Key Summary Metrics",
  "insights.dynamicData": "Dynamic State / District Data",
  "insights.totalPopulation": "Total Population",
  "insights.totalHouseholds": "Total Households",
  "insights.literacyRate": "Literacy Rate",
  "insights.populationGrowth": "Population Growth",
  "insights.sexRatio": "Sex Ratio",
  "insights.urbanShare": "Urban Share",
  "insights.visualizations": "Demographic Visualisations",
  "insights.populationChart": "Population Distribution",
  "insights.urbanRuralChart": "Urban vs Rural Split",
  "insights.literacyChart": "Literacy Overview",
  "insights.genderChart": "Gender Distribution",
  "insights.overallLiteracy": "Overall Literacy",
  "insights.maleLiteracy": "Male Literacy",
  "insights.femaleLiteracy": "Female Literacy",
  "insights.literacyGap": "Literacy Gap",
  "insights.male": "Male",
  "insights.female": "Female",
  "insights.femalesPerThousand": "Females per 1,000 Males",
  "insights.prototypeContainer": "Prototype Analytics Container",
  "insights.interactiveViz": "Interactive Visualisation",

  // ─── Footer ────────────────────────────────────────────
  "footer.tagline": "Empowering India's Census 2026 with AI-assisted digital access.",
  "footer.copyright": "© 2026 CensusAI Connect. For demonstration and awareness purposes.",
  "footer.disclaimer":
    "This is a prototype. Not affiliated with the Government of India. Dates and data are for demonstration only.",
};

export default en;
