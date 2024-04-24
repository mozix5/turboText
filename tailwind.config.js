/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgPrimary:"var(--bg-primary)",
        bgSecondary:"var(--bg-secondary)",
        textPrimary:"var(--text-primary)",
        caret:"var(--caret-color)",
        error:"var(--error-color)",
        textSecondary:"var(--text-secondary)",
      },
      fontFamily:{
        roboto:["Roboto Mono"," monospace"]
      }
    },
  },
  plugins: [],
}