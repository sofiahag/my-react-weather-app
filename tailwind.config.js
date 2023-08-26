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
        '14': '3.5rem',
        '100': '100px',
        '200': '200px',
        '300': '300px'
      }
    },
  },
  darkMode: 'class'
}
