/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          500: '#2d8a4e',
          700: '#1b5e34',
          800: '#144626',
          900: '#0d2e1a',
        },
        earth: {
          50: '#fbf9f5',
          100: '#f5efe4',
          500: '#a3704c',
          700: '#754b2d',
          800: '#4a2f1c',
        }
      }
    },
  },
  plugins: [],
}
