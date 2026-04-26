/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#020716",
          900: "#061021",
          850: "#0a1730",
          800: "#0e1d39",
        },
        electric: {
          500: "#1aa7ff",
          400: "#43c6ff",
          300: "#8be5ff",
        },
      },
      boxShadow: {
        glow: "0 0 42px rgba(26, 167, 255, 0.28)",
        danger: "0 0 34px rgba(239, 68, 68, 0.25)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
      },
      keyframes: {
        pulseLine: {
          "0%": { transform: "translateX(-120%)", opacity: "0" },
          "25%": { opacity: "0.8" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },
        floatNode: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
      },
      animation: {
        pulseLine: "pulseLine 5.6s linear infinite",
        floatNode: "floatNode 6s ease-in-out infinite",
        breathe: "breathe 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
