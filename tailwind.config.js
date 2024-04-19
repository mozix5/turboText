/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"var(--bg-color)",
        secondary:"var(--text-color)",
        caret:"var(--caret-color)",
        error:"var(--error-color)",
        typography:"var(--sub-text-color)",
      },
      fontFamily:{
        roboto:["Roboto Mono"," monospace"]
      }
    },
  },
  plugins: [],
}