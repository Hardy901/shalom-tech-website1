/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        kanit: ['Kanit', 'sans-serif'], // Keep just in case it's used elsewhere
      },
    },
  },
  plugins: [],
}
