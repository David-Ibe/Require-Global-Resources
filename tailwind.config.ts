import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1F3C",
          50: "#E8ECF2",
          100: "#D1D9E5",
          200: "#A3B3CB",
          300: "#758DB1",
          400: "#476797",
          500: "#0D1F3C",
          600: "#0B1A33",
          700: "#091529",
          800: "#07101F",
          900: "#050B15",
        },
        accent: {
          DEFAULT: "#E8601C",
          hover: "#D45618",
          light: "#FEF3ED",
        },
        page: "#F5F7FA",
        muted: "#6B7280",
        border: "#E5E7EB",
        success: "#16A34A",
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#0A0A0A",
        },
        rgr: {
          navy: "#0D1F3C",
          charcoal: "#1F2937",
          blue: "#0D1F3C",
          blueLight: "#1a3a6b",
          gold: "#E8601C",
          off: "#F5F7FA",
          surface: "#ffffff",
          navBar: "#E5E7EB",
          gray100: "#F5F7FA",
          gray300: "#D1D5DB",
          gray500: "#6B7280",
          gray600: "#4B5563",
          gray700: "#374151",
          success: "#16A34A",
          danger: "#DC2626",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "0.75rem",
        xl: "0.75rem",
        "2xl": "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(13, 31, 60, 0.04), 0 4px 12px rgba(13, 31, 60, 0.03)",
        card: "0 2px 8px rgba(13, 31, 60, 0.06)",
        nav: "0 1px 0 rgba(13, 31, 60, 0.06)",
        lift: "0 8px 24px rgba(13, 31, 60, 0.08)",
      },
      spacing: {
        section: "6rem",
        "section-sm": "4.5rem",
      },
      fontSize: {
        "hero-title": [
          "clamp(2.75rem, 6vw, 5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "section-title": [
          "clamp(1.75rem, 3.5vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "card-title": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
