export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  /** BCP-47 tag for the Web Speech API, or null if speech input is not supported for this language */
  speechLang: string | null;
  /** Placeholder hint shown in the textarea when this language is selected */
  voiceHint: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English",   nativeName: "English",   script: "Latin",           speechLang: "en-IN", voiceHint: "Speak naturally about the people in your household." },
  { code: "hi", name: "Hindi",     nativeName: "हिन्दी",    script: "Devanagari",      speechLang: "hi-IN", voiceHint: "अपने घर के सदस्यों के बारे में स्वाभाविक रूप से बोलें।" },
  { code: "bn", name: "Bengali",   nativeName: "বাংলা",     script: "Bengali",         speechLang: "bn-IN", voiceHint: "আপনার পরিবারের সদস্যদের সম্পর্কে স্বাভাবিকভাবে বলুন।" },
  { code: "te", name: "Telugu",    nativeName: "తెలుగు",    script: "Telugu",          speechLang: "te-IN", voiceHint: "మీ కుటుంబ సభ్యుల గురించి సహజంగా చెప్పండి." },
  { code: "mr", name: "Marathi",   nativeName: "मराठी",     script: "Devanagari",      speechLang: "mr-IN", voiceHint: "तुमच्या घरातील सदस्यांबद्दल स्वाभाविकपणे बोला." },
  { code: "ta", name: "Tamil",     nativeName: "தமிழ்",     script: "Tamil",           speechLang: "ta-IN", voiceHint: "உங்கள் குடும்பத்தினரைப் பற்றி இயல்பாக பேசுங்கள்." },
  { code: "gu", name: "Gujarati",  nativeName: "ગુજરાતી",   script: "Gujarati",        speechLang: "gu-IN", voiceHint: "તમારા ઘરના સભ્યો વિશે સ્વાભાવિક રીતે બોલો." },
  { code: "ur", name: "Urdu",      nativeName: "اردو",      script: "Perso-Arabic",    speechLang: null,    voiceHint: "اپنے گھر کے افراد کے بارے میں بتائیں۔" },
  { code: "kn", name: "Kannada",   nativeName: "ಕನ್ನಡ",    script: "Kannada",         speechLang: "kn-IN", voiceHint: "ನಿಮ್ಮ ಮನೆಯ ಸದಸ್ಯರ ಬಗ್ಗೆ ಸ್ವಾಭಾವಿಕವಾಗಿ ಮಾತನಾಡಿ." },
  { code: "or", name: "Odia",      nativeName: "ଓଡ଼ିଆ",    script: "Odia",            speechLang: null,    voiceHint: "ଆପଣଙ୍କ ପରିବାର ସଦସ୍ୟଙ୍କ ବିଷୟରେ କୁହନ୍ତୁ।" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം",   script: "Malayalam",       speechLang: "ml-IN", voiceHint: "നിങ്ങളുടെ കുടുംബ അംഗങ്ങളെ കുറിച്ച് സ്വാഭാവികമായി സംസാരിക്കുക." },
  { code: "pa", name: "Punjabi",   nativeName: "ਪੰਜਾਬੀ",   script: "Gurmukhi",        speechLang: "pa-IN", voiceHint: "ਆਪਣੇ ਘਰ ਦੇ ਮੈਂਬਰਾਂ ਬਾਰੇ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਦੱਸੋ।" },
  { code: "as", name: "Assamese",  nativeName: "অসমীয়া",   script: "Bengali-Assamese", speechLang: null,    voiceHint: "আপোনাৰ পৰিয়ালৰ সদস্যসকলৰ বিষয়ে কওক।" },
];
