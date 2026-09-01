"use client";

import * as React from "react";
import { Sparkles, Loader2, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HouseholdExtraction } from "@/types/census";

interface HouseholdAIInputProps {
  onExtractionSuccess: (data: HouseholdExtraction) => void;
}

export function HouseholdAIInput({ onExtractionSuccess }: HouseholdAIInputProps) {
  const [text, setText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleExtract = async () => {
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
        body: JSON.stringify({ text: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to extract household data.");
      }

      onExtractionSuccess(data.data as HouseholdExtraction);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-navy-50 to-white rounded-2xl border border-brand-navy-100 p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-brand-saffron-500" />
        <h3 className="text-lg font-bold text-slate-900">
          Describe Your Household Naturally
        </h3>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">
        Instead of filling every field manually, tell CensusAI about your household.
      </p>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          disabled={isLoading}
          placeholder='Example: "There are four people in my family: me, my wife, and two daughters."'
          className="w-full min-h-[100px] p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 focus:border-transparent resize-y disabled:opacity-50 disabled:bg-slate-50"
          maxLength={1000}
        />
        
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

        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
