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
        background: "#F8F8F5", // Warm off-white primary background
        surface: "#FFFFFF",    // Pure white cards & containers
        "surface-muted": "#F3F3EE",
        "soft-blue": "#EAF1F8",
        charcoal: "#252B35",
        navy: {
          50: "#F0F4F8",
          100: "#EAF1F8",
          200: "#D3E2F0",
          300: "#ACC7E1",
          400: "#7CA4CD",
          500: "#5181B5",
          600: "#386498",
          700: "#2B4D76",
          800: "#223B5A",
          900: "#17243A", // Deep navy typography & header
          950: "#0D1522",
        },
        gold: {
          50: "#FAF8F2",
          100: "#F3EDE0",
          200: "#E6D7BC",
          300: "#D6BF93",
          400: "#C7AA6F",
          500: "#B99A5B", // Elegant muted gold accent
          600: "#A48446",
          700: "#836735",
          800: "#6B532C",
          900: "#594426",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(23, 36, 58, 0.04), 0 1px 2px -1px rgba(23, 36, 58, 0.04)",
        card: "0 4px 20px -2px rgba(23, 36, 58, 0.05)",
        "card-hover": "0 14px 34px -4px rgba(23, 36, 58, 0.10)",
        "gold-glow": "0 0 25px -4px rgba(185, 154, 91, 0.25)",
      },
    },
  },
  plugins: [],
};
