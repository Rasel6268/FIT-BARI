/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx,json}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "#173F35",        // Primary Forest
          "forest-dark": "#0F2B24",
          "forest-light": "#1E4F43",
          sage: "#829B76",          // Secondary Sage
          "sage-dark": "#6A825F",
          "sage-light": "#A3B99A",
          ivory: "#F7F5ED",         // Warm Ivory Background
          white: "#FFFFFF",         // Soft White
          gold: "#D6A54A",          // Honey Gold Accent
          "gold-hover": "#C2933C",
          dark: "#252A26",          // Dark Typography
          muted: "#777D76",         // Muted Typography
          border: "#E7E3D8",        // Subtle border
          sand: "#EFECE1",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Manrope", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        tightest: "-0.03em",
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(23, 63, 53, 0.04)',
        'soft': '0 10px 30px -5px rgba(23, 63, 53, 0.05), 0 2px 6px -1px rgba(23, 63, 53, 0.02)',
        'elevate': '0 20px 40px -10px rgba(23, 63, 53, 0.08)',
      },
      borderRadius: {
        'card': '1rem',
      }
    },
  },
  plugins: [],
};
