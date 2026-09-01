"use client";

import * as React from "react";
import { Sparkles, Loader2, AlertCircle, Mic, MicOff, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HouseholdExtraction } from "@/types/census";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useLanguage } from "@/components/layout/LanguageProvider";

interface HouseholdAIInputProps {
  onExtractionSuccess: (data: HouseholdExtraction) => void;
}

export function HouseholdAIInput({ onExtractionSuccess }: HouseholdAIInputProps) {
  const [text, setText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Read the globally selected app language
  const { selectedLanguage } = useLanguage();

  // Resolve BCP-47 tag: use the language's speechLang, or fall back to en-IN
  const activeSpeechLang = selectedLanguage.speechLang ?? "en-IN";

  // Append speech transcript into the existing text — never overwrites
  const handleTranscript = React.useCallback((transcript: string) => {
    setText((prev) => {
      const separator = prev.trim() ? " " : "";
      return prev + separator + transcript;
    });
  }, []);

  const {
    status,
    errorMessage: speechError,
    startListening,
    stopListening,
    isSupported,
  } = useSpeechRecognition({
    onTranscript: handleTranscript,
    language: activeSpeechLang,
  });

  const isListening = status === "listening";
  const voiceSpeechDisabled = !selectedLanguage.speechLang;

  const handleMicClick = () => {
    if (error) setError(null);
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleExtract = async () => {
    if (isListening) stopListening();

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please describe your household before clicking understand.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/extract-household", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, language: selectedLanguage.name }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to extract household data.");
      }

      onExtractionSuccess(data.data as HouseholdExtraction);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-navy-50 to-white rounded-2xl border border-brand-navy-100 p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-brand-saffron-500" />
        <h3 className="text-lg font-bold text-slate-900">
          Describe Your Household Naturally
        </h3>
      </div>

      {/* Dynamic status hint */}
      <p className="text-sm text-slate-500 mb-4">
        {isListening
          ? "🎙️ Listening... Speak clearly. Click the microphone again to stop."
          : selectedLanguage.voiceHint}
      </p>

      <div className="space-y-4">
        {/* Textarea + mic button */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            disabled={isLoading}
            placeholder='Example: "There are four people in my family: me, my wife, and two daughters."'
            aria-label="Describe your household naturally in your own words"
            className="w-full min-h-[100px] p-3 pr-14 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 focus:border-transparent resize-y disabled:opacity-50 disabled:bg-slate-50"
            maxLength={1000}
          />

          {/* Mic button — only rendered when browser supports it AND language has a speechLang */}
          {isSupported && !voiceSpeechDisabled && (
            <button
              type="button"
              onClick={handleMicClick}
              disabled={isLoading}
              title={isListening ? "Stop listening" : `Start voice input (${activeSpeechLang})`}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              className={[
                "absolute right-2.5 top-2.5 h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-200",
                isListening
                  ? "bg-red-500 text-white shadow-md shadow-red-200 animate-pulse"
                  : "bg-slate-100 text-slate-500 hover:bg-brand-navy-100 hover:text-brand-navy-700",
                isLoading ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
              ].join(" ")}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Active voice language badge */}
        {isSupported && !voiceSpeechDisabled && (
          <div className="flex items-center gap-2">
            <span
              className={[
                "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors",
                isListening
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-slate-50 border-slate-200 text-slate-500",
              ].join(" ")}
            >
              <Mic className="h-3 w-3" />
              {selectedLanguage.nativeName} ({activeSpeechLang})
            </span>
          </div>
        )}

        {/* Listening pulse bar */}
        {isListening && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
            <AudioLines className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-xs font-medium text-red-600">
              Listening in {selectedLanguage.nativeName}...
            </span>
          </div>
        )}

        {/* Character count + submit */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {text.length}/1000 characters
          </div>
          <Button
            type="button"
            variant="saffron"
            size="md"
            onClick={handleExtract}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                CensusAI is understanding...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Understand My Household
              </>
            )}
          </Button>
        </div>

        {/* Speech recognition error */}
        {speechError && (
          <div className="p-3 bg-amber-50 text-amber-700 text-sm rounded-lg border border-amber-100 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p>{speechError}</p>
          </div>
        )}

        {/* Extraction API error */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Unsupported browser notice */}
        {!isSupported && (
          <p className="text-xs text-slate-400 italic">
            Voice input is not supported in this browser. Please type your household information instead.
          </p>
        )}

        {/* Supported browser but language has no speechLang */}
        {isSupported && voiceSpeechDisabled && (
          <p className="text-xs text-slate-400 italic">
            Voice input is not available for {selectedLanguage.nativeName} yet. Please type your household information.
          </p>
        )}
      </div>
    </div>
  );
}
