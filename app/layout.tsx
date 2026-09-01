import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CensusAI Connect | India's Digital Census, Made Simple with AI",
  description:
    "Empowering Indian citizens with an accessible, multilingual, and AI-assisted digital census experience. Understand Phase 1 & 2, check state schedules, verify claims, and self-enumerate with confidence.",
  keywords: [
    "Census India",
    "Digital Census 2026",
    "CensusAI Connect",
    "Houselisting",
    "Population Enumeration",
    "Self Enumeration",
    "Indian Languages",
  ],
  authors: [{ name: "CensusAI Connect Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2252",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50/30 text-slate-900 selection:bg-brand-navy-900 selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
