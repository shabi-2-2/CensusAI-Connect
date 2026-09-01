"use client";

import * as React from "react";
import { Bot, AlertTriangle, Plus, Trash2, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { HouseholdExtraction, HouseholdMember } from "@/types/census";

interface HouseholdReviewProps {
  initialData: HouseholdExtraction;
  onConfirm: (reviewedData: HouseholdExtraction) => void;
  onCancel: () => void;
}

export function HouseholdReview({
  initialData,
  onConfirm,
  onCancel,
}: HouseholdReviewProps) {
  // Deep clone initialData for local editing to avoid mutating original extraction
  const [localData, setLocalData] = React.useState<HouseholdExtraction>(() =>
    JSON.parse(JSON.stringify(initialData))
  );

  const handleHouseholdCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLocalData((prev) => ({
      ...prev,
      householdCount: isNaN(val) ? null : val,
    }));
  };

  const updateMember = (id: string, field: keyof HouseholdMember, value: any) => {
    setLocalData((prev) => ({
      ...prev,
      members: prev.members.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  const removeMember = (id: string) => {
    setLocalData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }));
  };

  const addMember = () => {
    const newMember: HouseholdMember = {
      id: `manual-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      relationship: "Unknown",
      age: null,
      gender: null,
    };
    setLocalData((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
  };

  const handleContinue = () => {
    onConfirm(localData);
  };

  const hasIssues =
    localData.confidence === "low" ||
    (localData.householdCount !== null &&
      localData.members.length !== localData.householdCount) ||
    localData.members.some((m) => m.relationship === "Unknown");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-brand-navy-600" />
        <h3 className="font-bold text-brand-navy-900">CensusAI Understood:</h3>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-sm text-slate-600">
          Please review this information before adding it to your form. You can make corrections if needed.
        </p>

        {hasIssues && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Review Required
              </h4>
              <p className="text-xs text-amber-800 mt-1">
                ⚠️ Some household information could not be fully identified or there is a mismatch between stated count and provided members. Please review it before continuing.
              </p>
              {localData.notes && localData.notes.length > 0 && (
                <ul className="list-disc pl-4 mt-2 text-xs text-amber-800">
                  {localData.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="max-w-xs">
            <Input
              type="number"
              label="Household Members Count"
              value={localData.householdCount ?? ""}
              onChange={handleHouseholdCountChange}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Extracted Members
              </label>
              <Button type="button" variant="outline" size="sm" onClick={addMember}>
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add Member
              </Button>
            </div>

            {localData.members.length === 0 ? (
              <p className="text-sm text-slate-500 italic py-4 text-center bg-slate-50 rounded-xl border border-slate-100">
                No members found. Please add members manually.
              </p>
            ) : (
              <div className="space-y-3">
                {localData.members.map((member, index) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-end p-4 rounded-xl border border-slate-200 bg-slate-50/50"
                  >
                    <div className="flex-1 w-full sm:w-auto">
                      <Input
                        label={`Member ${index + 1} Relationship`}
                        value={member.relationship}
                        onChange={(e) =>
                          updateMember(member.id, "relationship", e.target.value)
                        }
                      />
                    </div>
                    <div className="w-full sm:w-24">
                      <Input
                        type="number"
                        label="Age"
                        placeholder="Optional"
                        value={member.age ?? ""}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          updateMember(member.id, "age", isNaN(val) ? null : val);
                        }}
                      />
                    </div>
                    <div className="w-full sm:w-32">
                      <Select
                        label="Gender"
                        value={member.gender ?? ""}
                        onChange={(e) =>
                          updateMember(member.id, "gender", e.target.value || null)
                        }
                      >
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </Select>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2 sm:mt-0"
                      title="Remove member"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between sm:justify-end gap-3">
        <Button type="button" variant="outline" size="md" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="button" variant="saffron" size="md" onClick={handleContinue}>
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Confirm & Fill Form
        </Button>
      </div>
    </div>
  );
}
