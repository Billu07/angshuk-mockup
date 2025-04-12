/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-teal': '#4FD1C5',
        'off-white': '#F8FAFC',
        'light-gray': '#E2E8F0',
        'deep-charcoal': '#1A202C',
        'coral': '#F687B3',
      },
    },
  },
  plugins: [],
};