/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        main: {
          50: "#eef4ff",
          100: "#dceaff",
          200: "#b2d4ff",
          300: "#6db2ff",
          400: "#208bff",
          500: "#006bff",
          600: "#0051df",
          700: "#003fb4",
          800: "#003695",
          900: "#00094b",
          950: "#00091b",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        bounce200: "bounce 200ms infinite",
        bounce300: "bounce 300ms infinite",
        bounce500: "bounce 500ms infinite",
        bounce4: "bounce 7000ms infinite",
        // Define more custom animations as needed
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
