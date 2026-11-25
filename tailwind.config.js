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
        // Core Palette from Master Specification
        "deep-navy": "#101827",
        "midnight-blue": "#182A42",
        "champagne-gold": "#B99A5B",
        "aurora-blue": "#8D9FC5",
        "aurora-violet": "#A78BFA",
        "soft-white": "#F4F5F7",

        // Semantic & Theme aliases
        navy: {
          50: "#F0F4F8",
          100: "#EAF1F8",
          200: "#D3E2F0",
          300: "#ACC7E1",
          400: "#8D9FC5",
          500: "#5181B5",
          600: "#386498",
          700: "#2B4D76",
          800: "#182A42",
          900: "#101827",
          950: "#0B0F19",
        },
        gold: {
          50: "#FAF8F2",
          100: "#F3EDE0",
          200: "#E6D7BC",
          300: "#D6BF93",
          400: "#C7AA6F",
          500: "#B99A5B", // Champagne Gold
          600: "#A48446",
          700: "#836735",
          800: "#6B532C",
          900: "#594426",
        },
        aurora: {
          violet: "#A78BFA",
          blue: "#8D9FC5",
          cyan: "#38BDF8",
          gold: "#B99A5B",
          emerald: "#34D399",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        editorial: [
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        subtle: "0 2px 8px -2px rgba(16, 24, 39, 0.05)",
        card: "0 8px 30px -4px rgba(16, 24, 39, 0.08)",
        "card-hover": "0 18px 48px -6px rgba(16, 24, 39, 0.16)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.18)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.10)",
        "glass-inner": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)",
        "glass-inner-light": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.85)",
        "gold-glow": "0 0 35px -5px rgba(185, 154, 91, 0.35)",
        "aurora-glow": "0 0 45px -10px rgba(167, 139, 250, 0.30)",
      },
      animation: {
        "aurora-flow": "aurora-flow 18s ease-in-out infinite alternate",
        "aurora-pulse": "aurora-pulse 10s ease-in-out infinite",
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "shimmer": "shimmer 3.5s linear infinite",
      },
      keyframes: {
        "aurora-flow": {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
            opacity: "0.55",
          },
          "50%": {
            transform: "translate(40px, -30px) scale(1.15) rotate(15deg)",
            opacity: "0.85",
          },
          "100%": {
            transform: "translate(-30px, 35px) scale(0.95) rotate(-10deg)",
            opacity: "0.60",
          },
        },
        "aurora-pulse": {
          "0%, 100%": { opacity: "0.45", filter: "blur(70px)" },
          "50%": { opacity: "0.8", filter: "blur(90px)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
        glass: "20px",
        "glass-lg": "32px",
      },
    },
  },
  plugins: [],
};
