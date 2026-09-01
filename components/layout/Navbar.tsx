"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSelector } from "./LanguageSelector";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.selfEnumeration"), href: "/self-enumeration" },
    { label: t("nav.schedule"), href: "/schedule" },
    { label: t("nav.mythbuster"), href: "/mythbuster" },
    { label: t("nav.dataInsights"), href: "/data-insights" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-xs"
            : "bg-white/80 backdrop-blur-xs border-slate-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Name */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative">
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-brand-navy-900 to-brand-navy-700 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
                  <span className="bg-gradient-to-r from-white via-brand-saffron-300 to-white bg-clip-text text-transparent">
                    CA
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-brand-green-500 border-2 border-white ring-1 ring-brand-green-400/50"></div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-brand-navy-800 transition-colors">
                    Census<span className="text-brand-navy-600">AI</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-saffron-100 text-brand-saffron-700 border border-brand-saffron-200">
                    Connect
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
                  {t("nav.platformSubtitle")}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors relative",
                      isActive
                        ? "text-brand-navy-900 font-semibold bg-brand-navy-50/70"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-navy-900 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSelector />
              <Link href="/self-enumeration">
                <Button variant="saffron" size="sm" className="font-semibold shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  {t("nav.startSelfEnumeration")}
                </Button>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSelector />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

