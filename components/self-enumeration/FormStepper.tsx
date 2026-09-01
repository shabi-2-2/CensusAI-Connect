import * as React from "react";
import { Check, Home, Sparkles, Users, UserCheck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepDef {
  number: number;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
}

interface FormStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function FormStepper({ currentStep, onStepClick }: FormStepperProps) {
  const steps: StepDef[] = [
    {
      number: 1,
      title: "Household & Location",
      shortDesc: "Address & Structure Type",
      icon: <Home className="h-4 w-4" />,
    },
    {
      number: 2,
      title: "Housing Amenities",
      shortDesc: "Water, Power & Sanitation",
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      number: 3,
      title: "Household Assets",
      shortDesc: "Connectivity & Vehicles",
      icon: <Users className="h-4 w-4" />,
    },
    {
      number: 4,
      title: "Member Roster",
      shortDesc: "Resident Head & Family Count",
      icon: <UserCheck className="h-4 w-4" />,
    },
    {
      number: 5,
      title: "Review & QR Generation",
      shortDesc: "Digital Acknowledgment",
      icon: <ShieldCheck className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs mb-8">
      {/* Mobile Current Step Bar */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-brand-navy-900">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-slate-500 font-medium">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-saffron-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:grid sm:grid-cols-5 gap-2 relative">
        {steps.map((step, idx) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isPending = step.number > currentStep;

          return (
            <div
              key={step.number}
              onClick={() => onStepClick && onStepClick(step.number)}
              className={cn(
                "flex flex-col p-3 rounded-xl border transition-all cursor-pointer text-left relative",
                isCurrent
                  ? "bg-brand-navy-50 border-brand-navy-400 shadow-xs ring-2 ring-brand-navy-500/10"
                  : isCompleted
                  ? "bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50"
                  : "bg-slate-50 border-slate-200/80 opacity-70 hover:opacity-100"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={cn(
                    "h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold",
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-brand-navy-900 text-white"
                      : "bg-slate-200 text-slate-600"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
                </div>
                <div
                  className={cn(
                    "text-xs",
                    isCurrent
                      ? "text-brand-navy-700 font-semibold"
                      : isCompleted
                      ? "text-emerald-700 font-medium"
                      : "text-slate-400"
                  )}
                >
                  {isCompleted ? "Done" : isCurrent ? "Active" : "Upcoming"}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {step.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {step.shortDesc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
