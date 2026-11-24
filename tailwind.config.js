/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090c",
        surface: "#10131a",
        "surface-card": "#161b26",
        "surface-hover": "#1e2433",
        border: "#252d3d",
        gold: {
          50: "#fdfbf4",
          100: "#fbf6e7",
          200: "#f6eccb",
          300: "#eedda5",
          400: "#e4c673",
          500: "#d4af37", // Signature brand luxury gold
          600: "#b89028",
          700: "#926e22",
          800: "#775722",
          900: "#644722",
          950: "#39260f",
        },
        accent: {
          cyan: "#38bdf8",
          emerald: "#10b981",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        gold: "0 0 30px -5px rgba(212, 175, 55, 0.25)",
        "gold-lg": "0 0 50px -5px rgba(212, 175, 55, 0.35)",
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
