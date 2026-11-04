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
        background: "#050b14",
        surface: {
          DEFAULT: "rgba(13, 22, 38, 0.75)",
          card: "rgba(18, 30, 52, 0.65)",
          border: "rgba(56, 189, 248, 0.15)",
        },
        cyber: {
          blue: "#00d2ff",
          cyan: "#00f5d4",
          purple: "#7928ca",
          amber: "#f59e0b",
          red: "#ef4444",
          green: "#10b981",
        }
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(0, 210, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 210, 255, 0.05) 1px, transparent 1px)",
        "radar-radial": "radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, rgba(5, 11, 20, 0.8) 70%)"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanline 8s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" }
        }
      }
    },
  },
  plugins: [],
};
export default config;

