/** @type {import('tailwindcss').Config} */

import animatedPlugin from "tailwindcss-animated";

export default {
  darkMode: ["class"], // Enable dark mode with class strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Paths to your content files
  theme: {
    extend: {
      // Custom colors mapped to CSS variables
      colors: {
        white: "var(--white-color)",
        black: "var(--black-color)",
        heading: "var(--heading-color)",
        body: "var(--body-color)",
        ternary: "var(--ternary-color)",
        accent: {
          DEFAULT: "hsl(var(--accent--color))",
          foreground: "hsl(var(--accent-foreground))",
        },
        gray: "var(--gray-color)",
        gray2: "var(--gray2-color)",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      // Custom font families
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      // Enhanced border-radius values
      borderRadius: {
        lg: "0.5rem", 
        md: "0.375rem", 
        sm: "0.25rem", 
        xl: "0.75rem", 
        full: "9999px", 
      },
    },
  },
  plugins: [animatedPlugin], // Includes the animated plugin
};
