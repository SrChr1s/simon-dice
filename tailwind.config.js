/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '410px',
      'md': '768px',
      'lg': '1024px'
    },
    extend: {},
  },
  plugins: [],
}