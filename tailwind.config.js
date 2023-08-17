/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  fontFamily: {
    sofia: ['Sofia Pro']
  },
  theme: {
    extend: {
      spacing: {
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem'
      }
    },
  },
  darkMode: 'class'
}
