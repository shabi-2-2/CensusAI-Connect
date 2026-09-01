import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          navy: {
            50: "#EEF4FF",
            100: "#D9E6FF",
            200: "#BCD4FF",
            300: "#8EBCFE",
            400: "#5898FA",
            500: "#2F73F5",
            600: "#1754E8",
            700: "#103FC5",
            800: "#13359E",
            900: "#0B2252",
            950: "#061330",
          },
          saffron: {
            50: "#FFF7ED",
            100: "#FFEDD5",
            200: "#FED7AA",
            300: "#FDBA74",
            400: "#FB923C",
            500: "#F97316",
            600: "#EA580C",
            700: "#C2410C",
          },
          green: {
            50: "#ECFDF5",
            100: "#D1FAE5",
            200: "#A7F3D0",
            300: "#6EE7B7",
            400: "#34D399",
            500: "#10B981",
            600: "#059669",
            700: "#047857",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(47, 115, 245, 0.35)",
        "saffron-glow": "0 0 20px -3px rgba(249, 115, 22, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
