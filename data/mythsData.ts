import { MythItem } from "@/types/myth";

export const CENSUS_MYTHS: MythItem[] = [
  {
    id: "myth-taxation",
    claim: "Census data will be shared with the Income Tax Department to track individual finances.",
    category: "Privacy",
    verdict: "false",
    shortSummary: "False. Census Act 1948 strictly prohibits sharing individual information with tax or any enforcement agencies.",
    fullExplanation:
      "Under Section 15 of the Census Act, 1948, all individual answers given during census enumeration are completely confidential. Census records are legally protected and cannot be inspected or used as evidence in any court of law, tax assessment, or criminal investigation. Data is solely published in aggregate statistical format.",
    keyTakeaway: "Your individual data is sealed and strictly confidential by law.",
    sourceReference: "Section 15, The Census Act 1948 (Act No. 37 of 1948)",
    tags: ["Taxation", "Privacy", "Confidentiality", "Census Act"],
  },
  {
    id: "myth-documents",
    claim: "Citizens must show physical proof of identity (Aadhaar, Passport) or property deeds to census enumerators.",
    category: "Documents",
    verdict: "false",
    shortSummary: "False. No physical documents or certificates are required during census enumeration.",
    fullExplanation:
      "Census in India is based on truthful self-declaration. You are not required to provide physical documentation, land deeds, electricity bills, or proof of citizenship to enumerators. While an Aadhaar number may optionally be referenced for self-enumeration verification, no physical biometric or document submission is demanded.",
    keyTakeaway: "No certificates or property papers are needed. Just declare accurate information.",
    sourceReference: "Office of the Registrar General & Census Commissioner, India (ORGI)",
    tags: ["Documents", "Aadhaar", "Verification", "Proof"],
  },
  {
    id: "myth-mandatory-online",
    claim: "Self-enumeration online is mandatory for all urban households.",
    category: "Process",
    verdict: "false",
    shortSummary: "False. Self-enumeration is an optional convenience; traditional enumerator visits remain available.",
    fullExplanation:
      "While digital self-enumeration is introduced to empower citizens to fill their details online at their own pace, it is purely voluntary. If a household does not self-enumerate online during the window, an official enumerator will visit in person to record the details on a secure mobile app.",
    keyTakeaway: "You choose: fill online in 10 minutes or let an enumerator assist at your doorstep.",
    sourceReference: "Digital Census Operational Guidelines, Ministry of Home Affairs",
    tags: ["Online", "Self Enumeration", "Mandatory", "Enumerator"],
  },
  {
    id: "myth-npr-merger",
    claim: "Houselisting (Phase 1) and Population Enumeration (Phase 2) happen on the same day.",
    category: "Process",
    verdict: "false",
    shortSummary: "False. The Census is conducted in two distinct phases separated by several months.",
    fullExplanation:
      "Phase 1 focuses exclusively on housing stock, amenities, and building characteristics. Phase 2 happens months later and focuses on individual demographics (age, education, occupation, languages). They do not occur on the same day or concurrently.",
    keyTakeaway: "Phase 1 maps structures & amenities; Phase 2 counts individuals and demographics.",
    sourceReference: "Census of India Operational Schedule",
    tags: ["Phases", "Schedule", "Process"],
  },
  {
    id: "myth-bank-details",
    claim: "The census app asks for bank account numbers, PINs, or UPI details for DBT verification.",
    category: "Privacy",
    verdict: "false",
    shortSummary: "False. The Census NEVER asks for bank accounts, ATM PINs, OTPs, or financial details.",
    fullExplanation:
      "Census questionnaires only ask about access to banking services (e.g., 'Does the household avail banking services? Yes/No'). Any person or website asking for account numbers, CVVs, passwords, or OTPs is a scammer. Official census questions never touch private financial credentials.",
    keyTakeaway: "Never share OTPs or bank numbers. Census only asks a Yes/No question regarding banking access.",
    sourceReference: "Cyber Security & Fraud Prevention Advisory, ORGI",
    tags: ["Banking", "Cyber Security", "Fraud Alert", "OTP"],
  },
  {
    id: "myth-homeless-count",
    claim: "Houseless and nomadic populations are excluded from the digital census.",
    category: "Eligibility",
    verdict: "false",
    shortSummary: "False. Special midnight and mobile enumeration drives cover houseless and nomadic communities.",
    fullExplanation:
      "Special enumeration procedures are dedicated on the final night of Phase 2 to enumerate houseless populations sleeping at railway stations, roadside pavements, shelters, and places of worship. Nomadic groups are covered at their temporary settlements.",
    keyTakeaway: "Every resident living within India's borders is counted.",
    sourceReference: "Houseless Population Enumeration Manual, ORGI",
    tags: ["Inclusivity", "Nomadic", "Coverage"],
  },
];
