/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--ion-color-primary-tw-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--ion-color-secondary-tw-rgb) / <alpha-value>)',
        // primary: 'var(--ion-color-primary)',
      },

    },
  },
  plugins: [],
}

