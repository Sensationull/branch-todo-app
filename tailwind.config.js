/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-header": "hsl(var(--primary-header-text-green))",
        "accent-brand": "hsl(var(--accent-brand-text-green))",
        "primary-text": "hsl(var(--primary-text-gray))",
        "accent-bg": "hsl(var(--accent-bg-gray))",
        "primary-button": "hsl(var(--primary-button-blue))",
        "accent-button": "hsl(var(--accent-button-blue))",
        destructive: "hsl(var(--destructive-red-primary))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
