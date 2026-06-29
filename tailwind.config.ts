import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1B3E",
          secondary: "#1A3A6B",
          600: "#1A3A6B",
          700: "#0D1B3E",
        },
        accent: {
          DEFAULT: "#378ADD",
          hover: "#2B6CB8",
          light: "#E6F1FB",
          text: "#185FA5",
        },
        page: "#F6F7F9",
        surface: "#FFFFFF",
        "section-alt": "#F0F2F5",
        highlight: "#EEF2F8",
        muted: "#6B7280",
        quiet: "#94A3B8",
        border: "#E8ECF0",
        success: "#16A34A",
        error: "#DC2626",
        whatsapp: "#25D366",
        neutral: {
          50: "#F6F7F9",
          100: "#F0F2F5",
          200: "#E8ECF0",
          300: "#D1D5DB",
          400: "#94A3B8",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#0D1B3E",
          950: "#0D1B3E",
        },
        rgr: {
          navy: "#0D1B3E",
          blue: "#378ADD",
          blueLight: "#1A3A6B",
          gold: "#378ADD",
          off: "#F6F7F9",
          surface: "#FFFFFF",
          gray100: "#F6F7F9",
          gray300: "#E8ECF0",
          gray500: "#6B7280",
          gray600: "#374151",
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
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        md: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        soft: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        lift: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
      },
      spacing: {
        section: "6rem",
        "section-sm": "4.5rem",
      },
      fontSize: {
        "hero-title": [
          "clamp(2rem, 4vw, 2.5rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "section-title": [
          "clamp(1.375rem, 2.5vw, 1.625rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "card-title": ["0.9375rem", { lineHeight: "1.3", fontWeight: "600" }],
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
