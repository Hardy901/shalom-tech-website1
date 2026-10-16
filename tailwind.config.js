/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'hue-shift': 'hue 4s linear infinite',
      },
      keyframes: {
        hue: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
