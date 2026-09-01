"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles, Home, Info, FileCheck, Calendar, ShieldCheck, BarChart3 } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "About Census", href: "/about", icon: Info },
    { label: "Self Enumeration", href: "/self-enumeration", icon: FileCheck },
    { label: "Schedule", href: "/schedule", icon: Calendar },
    { label: "Mythbuster", href: "/mythbuster", icon: ShieldCheck },
    { label: "Data Insights", href: "/data-insights", icon: BarChart3 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-navy-900 flex items-center justify-center text-white font-bold text-sm shadow-md">
                CA
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-slate-900 text-sm tracking-tight">
                  CensusAI Connect
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Digital Census Platform
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-navy-50 text-brand-navy-900 font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-brand-navy-900" : "text-slate-400"
                    )}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-slate-100">
            <LanguageSelector variant="mobile" />
          </div>
        </div>

        {/* CTA at Bottom */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <Link href="/self-enumeration" onClick={onClose} className="block w-full">
            <Button variant="saffron" size="md" className="w-full">
              <Sparkles className="h-4 w-4 mr-1.5" />
              Start Self Enumeration
            </Button>
          </Link>
          <p className="text-[11px] text-center text-slate-500">
            Prototype demo for Digital Census 2026
          </p>
        </div>
      </div>
    </div>
  );
}
