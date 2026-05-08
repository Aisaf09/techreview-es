import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card:         "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.08)",
        "card-hover": "0 4px 12px rgba(0,0,0,.1), 0 16px 40px rgba(37,99,235,.15)",
        glow:         "0 0 20px rgba(59,130,246,.4)",
        "dark-card":  "0 1px 3px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.4)",
      },
      animation: {
        "fade-in-up":    "fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":       "fadeIn 0.5s ease both",
        "slide-in-left": "slideInLeft 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in":      "scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
        "float":         "float 4s ease-in-out infinite",
        "gradient-shift":"gradientShift 12s ease infinite",
        "shimmer":       "shimmer 1.5s infinite",
        "spin-slow":     "spin 3s linear infinite",
      },
      keyframes: {
        fadeInUp:      { from:{opacity:"0",transform:"translateY(24px)"}, to:{opacity:"1",transform:"translateY(0)"} },
        fadeIn:        { from:{opacity:"0"}, to:{opacity:"1"} },
        slideInLeft:   { from:{opacity:"0",transform:"translateX(-20px)"}, to:{opacity:"1",transform:"translateX(0)"} },
        scaleIn:       { from:{opacity:"0",transform:"scale(0.95)"}, to:{opacity:"1",transform:"scale(1)"} },
        float:         { "0%,100%":{transform:"translateY(0px)"}, "50%":{transform:"translateY(-8px)"} },
        gradientShift: { "0%":{backgroundPosition:"0% 50%"}, "50%":{backgroundPosition:"100% 50%"}, "100%":{backgroundPosition:"0% 50%"} },
        shimmer:       { "0%":{backgroundPosition:"-200% 0"}, "100%":{backgroundPosition:"200% 0"} },
      },
      typography: {
        DEFAULT: { css: { maxWidth: "none" } },
        invert:  { css: { "--tw-prose-body": "#d1d5db", "--tw-prose-headings": "#f9fafb", "--tw-prose-links": "#60a5fa" } },
      },
      backgroundSize: { "400%": "400% 400%" },
    },
  },
  plugins: [typography],
};

export default config;
