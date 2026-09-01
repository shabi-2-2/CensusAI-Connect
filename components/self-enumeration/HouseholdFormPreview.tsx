"use client";

import * as React from "react";
import {
  Home,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Bot,
  HelpCircle,
  ShieldCheck,
  Building,
  Info,
  Trash2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { STATE_SCHEDULES } from "@/data/scheduleData";
import { HouseholdAIInput } from "@/components/self-enumeration/HouseholdAIInput";
import { HouseholdReview } from "@/components/self-enumeration/HouseholdReview";
import { HouseholdExtraction, HouseholdMember } from "@/types/census";

interface HouseholdFormPreviewProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  onOpenAI: (prompt: string) => void;
}

export function HouseholdFormPreview({
  currentStep,
  onStepChange,
  onOpenAI,
}: HouseholdFormPreviewProps) {
  const [formData, setFormData] = React.useState({
    state: "delhi",
    district: "New Delhi",
    subDistrict: "Chanakyapuri",
    censusHouseNumber: "HN-2026-4891",
    ownershipStatus: "owned",
    dwellingType: "pucca",
    exclusiveRooms: "3",
    marriedCouples: "1",
    drinkingWaterSource: "treated_tap",
    lightingSource: "electricity",
    latrineFacility: "flush_piped",
    cookingFuel: "lpg_png",
    hasInternet: "yes",
    hasVehicle: "two_wheeler",
  });

  const [activeHint, setActiveHint] = React.useState<string>(
    "Census House Number is the official number assigned by municipal or village enumerators."
  );

  const [extractedData, setExtractedData] = React.useState<HouseholdExtraction | null>(null);
  
  // Manual Roster State
  const [householdCount, setHouseholdCount] = React.useState<number | "">("");
  const [rosterMembers, setRosterMembers] = React.useState<HouseholdMember[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmAI = (reviewedData: HouseholdExtraction) => {
    setHouseholdCount(reviewedData.householdCount ?? "");
    setRosterMembers(reviewedData.members);
    setExtractedData(null);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      onStepChange(currentStep + 1);
    } else {
      alert("Demo Workflow Complete: This generates an official QR Code and Acknowledgment Slip in Phase 2!");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Form Card */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Header of the Form */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" size="md">
                  Step {currentStep} of 5
                </Badge>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Self-Enumeration Phase 1
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                {currentStep === 1 && "Household & Location Details"}
                {currentStep === 2 && "Housing Amenities & Facilities"}
                {currentStep === 3 && "Household Assets & Connectivity"}
                {currentStep === 4 && "Member Summary & Roster"}
                {currentStep === 5 && "Review & QR Code Generation"}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Draft Saved Automatically</span>
            </div>
          </div>

          {/* Step 1: Household & Location Details */}
          {currentStep === 1 && (
            <form onSubmit={handleContinue} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="State / Union Territory"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                >
                  {STATE_SCHEDULES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.stateName}
                    </option>
                  ))}
                </Select>

                <Select
                  label="District"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                >
                  <option value="New Delhi">New Delhi</option>
                  <option value="Central Delhi">Central Delhi</option>
                  <option value="South Delhi">South Delhi</option>
                  <option value="North Delhi">North Delhi</option>
                </Select>

                <Input
                  label="Sub-District / Tehsil / Ward"
                  value={formData.subDistrict}
                  onChange={(e) => handleInputChange("subDistrict", e.target.value)}
                  placeholder="e.g. Ward 12 or Chanakyapuri"
                  onFocus={() =>
                    setActiveHint(
                      "Enter your municipal ward name or sub-district tehsil. Check your voter ID or electricity bill if unsure."
                    )
                  }
                />

                <Input
                  label="Census House Number"
                  value={formData.censusHouseNumber}
                  onChange={(e) =>
                    handleInputChange("censusHouseNumber", e.target.value)
                  }
                  placeholder="e.g. HN-2026-4891"
                  onFocus={() =>
                    setActiveHint(
                      "If an enumerator marked a chalk number on your wall, enter it here. Otherwise, your postal house number is fine."
                    )
                  }
                />
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Structure & Ownership Characteristics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Ownership Status of the House"
                    value={formData.ownershipStatus}
                    onChange={(e) =>
                      handleInputChange("ownershipStatus", e.target.value)
                    }
                  >
                    <option value="owned">Owned by Household</option>
                    <option value="rented">Rented / Leased</option>
                    <option value="other">Any Other Accommodation</option>
                  </Select>

                  <Select
                    label="Predominant Structure Type"
                    value={formData.dwellingType}
                    onChange={(e) =>
                      handleInputChange("dwellingType", e.target.value)
                    }
                  >
                    <option value="pucca">Pucca (Permanent Concrete/Brick/Stone)</option>
                    <option value="semi-pucca">Semi-Pucca (Timber/Tiles/Asbestos)</option>
                    <option value="kutcha">Kutcha (Thatch/Mud/Bamboo)</option>
                  </Select>

                  <Input
                    type="number"
                    min="1"
                    max="30"
                    label="Number of Living Rooms Exclusively for Household"
                    value={formData.exclusiveRooms}
                    onChange={(e) =>
                      handleInputChange("exclusiveRooms", e.target.value)
                    }
                  />

                  <Input
                    type="number"
                    min="0"
                    max="10"
                    label="Number of Married Couples Living in this Household"
                    value={formData.marriedCouples}
                    onChange={(e) =>
                      handleInputChange("marriedCouples", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Form Navigation Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  disabled
                  className="opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button type="submit" variant="saffron" size="lg" className="shadow-md">
                  Continue to Step 2
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2 Preview */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-slate-600">
                In this step, you declare basic amenities such as drinking water source, lighting, sanitation, and kitchen fuel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Primary Source of Drinking Water"
                  value={formData.drinkingWaterSource}
                  onChange={(e) =>
                    handleInputChange("drinkingWaterSource", e.target.value)
                  }
                >
                  <option value="treated_tap">Treated Piped Tap Water</option>
                  <option value="untreated_tap">Untreated Tap Water</option>
                  <option value="handpump">Handpump / Borewell</option>
                  <option value="covered_well">Covered Well</option>
                </Select>

                <Select
                  label="Main Source of Lighting"
                  value={formData.lightingSource}
                  onChange={(e) =>
                    handleInputChange("lightingSource", e.target.value)
                  }
                >
                  <option value="electricity">Electricity Grid</option>
                  <option value="solar">Solar Energy Power</option>
                  <option value="kerosene">Kerosene Lamp</option>
                  <option value="other">Other Source</option>
                </Select>

                <Select
                  label="Latrine Facility Access"
                  value={formData.latrineFacility}
                  onChange={(e) =>
                    handleInputChange("latrineFacility", e.target.value)
                  }
                >
                  <option value="flush_piped">Flush Latrine Connected to Piped Sewer</option>
                  <option value="flush_septic">Flush Latrine with Septic Tank</option>
                  <option value="pit_latrine">Twin-Pit Latrine with Slab</option>
                  <option value="none">No Latrine within premises</option>
                </Select>

                <Select
                  label="Primary Cooking Fuel"
                  value={formData.cookingFuel}
                  onChange={(e) =>
                    handleInputChange("cookingFuel", e.target.value)
                  }
                >
                  <option value="lpg_png">LPG / PNG Piped Gas</option>
                  <option value="electric_induction">Electric Induction</option>
                  <option value="biogas">Biogas Plant</option>
                  <option value="firewood">Firewood / Biomass</option>
                </Select>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => onStepChange(1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Step 1
                </Button>
                <Button
                  type="button"
                  variant="saffron"
                  size="lg"
                  onClick={() => onStepChange(3)}
                >
                  Continue to Step 3
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 Preview */}
          {currentStep === 3 && (
            <div className="space-y-6 py-6 text-center">
              <div className="h-16 w-16 rounded-2xl bg-brand-navy-50 text-brand-navy-900 mx-auto flex items-center justify-center border border-brand-navy-100">
                <Sparkles className="h-8 w-8 text-brand-saffron-500" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Step 3: Household Assets Preview
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  This multi-step form preview demonstrates the simplified citizen workflow designed for Phase 1. Complete validation and encrypted submission will be integrated in Phase 2.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => onStepChange(currentStep - 1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="saffron"
                  size="lg"
                  onClick={() => onStepChange(currentStep + 1)}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4 Preview */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {showSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 mb-6">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">
                      Form Filled via AI
                    </h4>
                    <p className="text-xs text-emerald-800 mt-1">
                      CensusAI successfully filled your household details. You can continue editing below if needed.
                    </p>
                  </div>
                </div>
              )}

              {!extractedData ? (
                <HouseholdAIInput 
                  onExtractionSuccess={(data) => {
                    setExtractedData(data);
                  }} 
                />
              ) : (
                <HouseholdReview
                  initialData={extractedData}
                  onConfirm={handleConfirmAI}
                  onCancel={() => setExtractedData(null)}
                />
              )}

              {/* Manual Form Area */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Building className="h-5 w-5 text-brand-navy-500" />
                    Resident Count & Roster
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Enter the total number of residents and list each member.
                  </p>
                </div>

                <div className="max-w-xs">
                  <Input
                    type="number"
                    label="Total Household Count"
                    value={householdCount}
                    onChange={(e) => setHouseholdCount(e.target.value === "" ? "" : parseInt(e.target.value))}
                    placeholder="e.g. 4"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-700">Household Members</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setRosterMembers((prev) => [
                          ...prev,
                          { id: `m-${Date.now()}`, relationship: "", age: null, gender: null },
                        ]);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add Member
                    </Button>
                  </div>

                  {rosterMembers.length === 0 ? (
                    <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                      <p className="text-sm text-slate-500">No members added yet.</p>
                      <p className="text-xs text-slate-400 mt-1">Use AI extraction above or add manually.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rosterMembers.map((member, idx) => (
                        <div key={member.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end p-4 rounded-xl border border-slate-200 bg-slate-50">
                          <div className="flex-1 w-full sm:w-auto">
                            <Input
                              label={`Member ${idx + 1} Relationship`}
                              value={member.relationship}
                              onChange={(e) => {
                                const newMembers = [...rosterMembers];
                                newMembers[idx].relationship = e.target.value;
                                setRosterMembers(newMembers);
                              }}
                            />
                          </div>
                          <div className="w-full sm:w-24">
                            <Input
                              type="number"
                              label="Age"
                              value={member.age ?? ""}
                              onChange={(e) => {
                                const newMembers = [...rosterMembers];
                                newMembers[idx].age = e.target.value === "" ? null : parseInt(e.target.value);
                                setRosterMembers(newMembers);
                              }}
                            />
                          </div>
                          <div className="w-full sm:w-32">
                            <Select
                              label="Gender"
                              value={member.gender ?? ""}
                              onChange={(e) => {
                                const newMembers = [...rosterMembers];
                                newMembers[idx].gender = e.target.value;
                                setRosterMembers(newMembers);
                              }}
                            >
                              <option value="">Select...</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Transgender">Transgender</option>
                            </Select>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setRosterMembers((prev) => prev.filter((m) => m.id !== member.id));
                            }}
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

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => onStepChange(currentStep - 1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="saffron"
                  size="lg"
                  onClick={() => onStepChange(currentStep + 1)}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5 Preview */}
          {currentStep === 5 && (
            <div className="space-y-6 py-6 text-center">
              <div className="h-16 w-16 rounded-2xl bg-brand-navy-50 text-brand-navy-900 mx-auto flex items-center justify-center border border-brand-navy-100">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Step 5: Digital Acknowledgment
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  This multi-step form preview demonstrates the simplified citizen workflow designed for Phase 1. Complete validation and encrypted submission will be integrated in Phase 2.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => onStepChange(currentStep - 1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="saffron"
                  size="lg"
                  onClick={handleContinue}
                >
                  Submit Demo Form
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: AI Assistant Context & Quick Help */}
      <div className="lg:col-span-4 space-y-6">
        {/* AI Helper Card */}
        <div className="bg-gradient-to-br from-brand-navy-900 to-brand-navy-800 text-white rounded-3xl p-6 shadow-md border border-brand-navy-700 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-brand-saffron-500 flex items-center justify-center text-white shadow-xs">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">CensusAI Live Helper</h3>
              <p className="text-[11px] text-brand-saffron-300">Context-Aware Field Guidance</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-slate-200 leading-relaxed">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-brand-saffron-400" />
              Guidance for this section:
            </div>
            {activeHint}
          </div>

          <Button
            variant="saffron"
            size="sm"
            onClick={() =>
              onOpenAI(
                `I am filling Step ${currentStep} of Self-Enumeration. Explain what questions are asked here and what answers are valid.`
              )
            }
            className="w-full text-xs shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Ask AI About Step {currentStep}
          </Button>
        </div>

        {/* 3 Steps Checklist Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-brand-green-500" />
            Self-Enumeration Tips
          </h4>

          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>
                <strong>No documents needed:</strong> You do not need to attach or upload identity cards or property deeds.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>
                <strong>Get QR Acknowledgment:</strong> On completing Step 5, you receive an acknowledgment code to show your visiting enumerator.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>
                <strong>Voluntary & Convenient:</strong> Saves 10+ minutes during the door-to-door enumeration visit.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
