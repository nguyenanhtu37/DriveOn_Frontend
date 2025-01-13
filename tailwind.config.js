/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "var(--white-color)",
        black: "var(--black-color)",
        heading: "var(--heading-color)",
        body: "var(--body-color)",
        ternary: "var(--ternary-color)",
        accent: "var(--accent-color)",
        gray: "var(--gray-color)",
        gray2: "var(--gray2-color)",
        border: "var(--border-color)",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
