/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0F111A', // Main bg
          800: '#161925', // Card bg
          700: '#232736', // Borders
        }
      }
    },
  },
  plugins: [],
}
