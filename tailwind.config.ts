import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        rgr: {
          navy: "#08142A",
          charcoal: "#1a202c",
          blue: "#1246D6",
          blueLight: "#2563EB",
          gold: "#F5A623",
          off: "#f7f8fa",
          surface: "#ffffff",
          navBar: "#e2e8f0",
          gray100: "#F1F5F9",
          gray300: "#CBD5E1",
          gray500: "#64748B",
          gray600: "#475569",
          gray700: "#334155",
          success: "#16A34A",
          danger: "#DC2626",
          whatsapp: "#25D366"
        },
        brand: {
          navy: "#08142A",
          electric: "#1246D6",
          dark: "#08142A",
          light: "#FFFFFF",
          muted: "#CBD5E1"
        }
      },
      fontFamily: {
        sans: ["var(--font-dm)", "system-ui", "sans-serif"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(8, 20, 42, 0.08)",
        lift: "0 12px 40px rgba(8, 20, 42, 0.12)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(18, 70, 214, 0.35), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(18, 70, 214, 0.2), transparent 50%)"
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        pulseStock: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" }
        }
      },
      transitionDuration: {
        "600": "600ms"
      },
      animation: {
        "fade-in-up": "fade-in-up 0.55s ease-out forwards",
        pulseStock: "pulseStock 1.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
