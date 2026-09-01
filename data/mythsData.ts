import { MythEntry } from "@/types/myth";

export const MYTHS_DATA: MythEntry[] = [
  {
    id: "myth-police-sharing",
    myth: "My census information will automatically be shared with the police.",
    verdict: "false",
    explanation:
      "Under Section 15 of the Census Act, 1948, individual census records are strictly confidential and legally protected. They cannot be inspected by police officers, tax authorities, or used as evidence in any legal proceedings.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Census data is collected solely for national aggregate statistics and cannot be accessed for law enforcement.",
    category: "privacy",
    keywords: ["police", "law enforcement", "criminal", "confidentiality", "sharing", "section 15", "court"],
    sourceLabel: "Section 15, The Census Act 1948",
  },
  {
    id: "myth-fee-charging",
    myth: "I have to pay money to complete census self-enumeration.",
    verdict: "false",
    explanation:
      "Census self-enumeration and doorstep enumerator visits are 100% free of cost provided by the Government of India. Official portals and census workers will never request payment or fee charges.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Anyone demanding money or charging fees for census filling is an imposter attempting a financial fraud.",
    category: "fraud",
    keywords: ["pay", "money", "fee", "cost", "charge", "payment", "free", "scam"],
    sourceLabel: "ORGI Official Operational Guidelines",
  },
  {
    id: "myth-bank-password",
    myth: "A census worker can ask me for my bank password.",
    verdict: "false",
    explanation:
      "Census questionnaires only ask about general household amenities, such as whether your household avails banking services (Yes/No). Official enumerators never collect financial passwords, PINs, or account credentials.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Never reveal bank passwords, PINs, or CVVs to anyone claiming to be a census enumerator.",
    category: "fraud",
    keywords: ["bank password", "bank", "password", "pin", "financial", "cvv", "account"],
    sourceLabel: "Cyber Security & Fraud Advisory, ORGI",
  },
  {
    id: "myth-otp-request",
    myth: "A census worker can ask for an OTP.",
    verdict: "false",
    explanation:
      "OTP verification is only generated during voluntary citizen self-enumeration on official web portals. Field enumerators visiting your house will never ask you to reveal personal OTPs sent to your mobile phone.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Treat any unsolicited phone call or person demanding an OTP as a potential fraud attempt.",
    category: "fraud",
    keywords: ["otp", "one time password", "sms", "verification code", "code", "phone"],
    sourceLabel: "Cyber Security & Fraud Advisory, ORGI",
  },
  {
    id: "myth-benefit-loss-mistake",
    myth: "I will lose government benefits if I make a typing mistake.",
    verdict: "misleading",
    explanation:
      "Typing errors or inadvertent mistakes during self-enumeration do not lead to immediate cancellation of welfare benefits. During field enumeration, supervisors verify data and corrections can be made.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Take your time when self-enumerating. Minor typos do not forfeit citizen welfare entitlements.",
    category: "eligibility",
    keywords: ["mistake", "typing", "benefit", "welfare", "lose", "scheme", "error", "typo"],
    sourceLabel: "Census Operations Welfare Policy Guidelines",
  },
  {
    id: "myth-immediate-trust-officer",
    myth: "Anyone who claims to be a census officer should be trusted immediately.",
    verdict: "misleading",
    explanation:
      "Official census enumerators are issued official QR-coded photo Identity Cards. Citizens have the right to request proof of identity before answering doorstep questions.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Always ask to inspect the official ID card of any field enumerator visiting your home.",
    category: "fraud",
    keywords: ["officer", "trust", "id card", "enumerator", "identity", "worker", "imposter", "verify"],
    sourceLabel: "ORGI Citizen Security Standard Protocols",
  },
  {
    id: "myth-taxation-use",
    myth: "Census data can be used for direct taxation.",
    verdict: "false",
    explanation:
      "Under the Census Act, individual responses are legally segregated from revenue and taxation departments. The Income Tax Department cannot access census records to assess personal tax liabilities.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Your census responses are strictly sealed for statistical demographic planning and cannot be used for tax auditing.",
    category: "data",
    keywords: ["tax", "taxation", "income tax", "revenue", "audit", "direct tax", "finance"],
    sourceLabel: "Section 15, The Census Act 1948",
  },
  {
    id: "myth-financial-passwords-share",
    myth: "I must share sensitive financial passwords to complete the census.",
    verdict: "false",
    explanation:
      "No census question requires bank passwords, net banking credentials, or wallet security keys. The census collects demographic and housing data, not personal financial access codes.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Immediately report any entity requesting financial passwords in the name of the census.",
    category: "privacy",
    keywords: ["financial", "password", "net banking", "credentials", "wallet", "sensitive"],
    sourceLabel: "ORGI Security Policy Framework",
  },
  {
    id: "myth-whatsapp-links",
    myth: "I should share personal information through random WhatsApp links.",
    verdict: "false",
    explanation:
      "The official Census self-enumeration is hosted exclusively on official government domain portals (.gov.in). Official census data is never gathered via informal WhatsApp surveys or random shortened links.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Never click or submit household details on suspicious links shared via WhatsApp, SMS, or social media.",
    category: "fraud",
    keywords: ["whatsapp", "link", "social media", "phishing", "random", "url", "message", "viral"],
    sourceLabel: "Cyber Crime Awareness Bureau Advisory",
  },
  {
    id: "myth-guess-unknown-questions",
    myth: "If I do not understand a census question, I should guess.",
    verdict: "needs_verification",
    explanation:
      "Guessing can lead to inaccurate statistical data. If a question is unclear during self-enumeration, you can refer to in-app help guides or wait for the field enumerator to clarify.",
    safetyGuidance:
      "Prototype guidance based on the CensusAI Connect knowledge base: Use help tooltips or contact the official helpline if you are uncertain about how to answer a specific question.",
    category: "enumeration",
    keywords: ["guess", "question", "understand", "don't know", "unclear", "help", "guide"],
    sourceLabel: "ORGI Self-Enumeration Guidance Notes",
  },
];

// Export alias for backward compatibility
export const CENSUS_MYTHS = MYTHS_DATA;

/**
 * Deterministic keyword matching function for myth lookup.
 * Searches across myth text, category, keywords, explanation, and safety guidance.
 */
export function searchMyths(query: string, categoryFilter: string = "All"): MythEntry[] {
  const normQuery = query.trim().toLowerCase();

  return MYTHS_DATA.filter((item) => {
    // Category match
    if (categoryFilter !== "All") {
      const normCat = categoryFilter.toLowerCase();
      if (normCat === "fraud & safety" && item.category !== "fraud") return false;
      if (normCat === "data use" && item.category !== "data") return false;
      if (normCat !== "fraud & safety" && normCat !== "data use" && item.category !== normCat) {
        return false;
      }
    }

    if (!normQuery) return true;

    // Direct keyword array match
    const keywordMatch = item.keywords.some(
      (kw) => normQuery.includes(kw.toLowerCase()) || kw.toLowerCase().includes(normQuery)
    );

    // Text field matches
    const mythMatch = item.myth.toLowerCase().includes(normQuery);
    const explanationMatch = item.explanation.toLowerCase().includes(normQuery);
    const categoryMatch = item.category.toLowerCase().includes(normQuery);
    const safetyMatch = item.safetyGuidance ? item.safetyGuidance.toLowerCase().includes(normQuery) : false;

    return keywordMatch || mythMatch || explanationMatch || categoryMatch || safetyMatch;
  });
}
