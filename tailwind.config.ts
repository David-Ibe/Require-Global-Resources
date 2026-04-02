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
        brand: {
          navy: "#0A2463",
          electric: "#2563EB",
          dark: "#0B0F19",
          light: "#FFFFFF",
          muted: "#CBD5E1"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(10, 36, 99, 0.08)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top right, rgba(37,99,235,0.12), rgba(255,255,255,0.94) 45%)"
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
