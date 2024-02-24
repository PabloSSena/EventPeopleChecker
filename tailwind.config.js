/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ui/*.{js,jsx,ts,tsx}",
    "./client/*.html",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          lighter: '#F5F3FF',
          light: '#DDD6FE',
          primary: '#5B21B6',
          dark: '#4C1D95',
        },
      }
    },

  },
  plugins: [],
}