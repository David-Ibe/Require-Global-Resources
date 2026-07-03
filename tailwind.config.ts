import type { Config } from "tailwindcss";

/** Remap warm palette slots to accent blue so orange/amber utilities cannot render orange. */
const accentBlueScale = {
  50: "#EFF6FF",
  100: "#DBEAFE",
  200: "#BFDBFE",
  300: "#93C5FD",
  400: "#60A5FA",
  500: "#2563EB",
  600: "#1D4ED8",
  700: "#1E40AF",
  800: "#1E3A8A",
  900: "#1E3A8A",
  950: "#172554",
} as const;

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
          DEFAULT: "#111827",
          secondary: "#1F2937",
          600: "#374151",
          700: "#111827",
        },
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#EFF6FF",
          text: "#1D4ED8",
        },
        page: "#F8F9FB",
        image: "#E2E8F0",
        surface: "#FFFFFF",
        "section-alt": "#F3F4F6",
        highlight: "#F3F4F6",
        muted: "#6B7280",
        quiet: "#9CA3AF",
        border: "#F3F4F6",
        success: "#22C55E",
        error: "#DC2626",
        whatsapp: "#25D366",
        orange: accentBlueScale,
        amber: accentBlueScale,
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
        sm: "0 1px 2px rgba(17,24,39,0.04)",
        md: "0 4px 16px rgba(17,24,39,0.06), 0 2px 4px rgba(17,24,39,0.04)",
        soft: "0 2px 8px rgba(17,24,39,0.04), 0 8px 24px rgba(17,24,39,0.06)",
        card: "0 2px 8px rgba(17,24,39,0.04), 0 12px 32px rgba(17,24,39,0.06)",
        lift: "0 6px 20px rgba(17,24,39,0.08), 0 16px 48px rgba(37,99,235,0.1)",
        glow: "0 0 0 1px rgba(37,99,235,0.08), 0 8px 32px rgba(37,99,235,0.12)",
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
        "card-title": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" }],
        "card-price": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
