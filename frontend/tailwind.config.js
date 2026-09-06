/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          200: '#c5e4cd',
          300: '#99d0a6',
          400: '#66b47a',
          500: '#3e9654',
          600: '#2e7940',
          700: '#266035',
          800: '#224d2d',
          900: '#1d4027',
          950: '#0b2313',
        },
        earth: {
          50: '#faf7f2',
          100: '#f2eae0',
          200: '#e5d5c1',
          300: '#d4ba9c',
          400: '#c29b77',
          500: '#b4835d',
          600: '#a67051',
          700: '#8a5943',
          800: '#71493b',
          900: '#5e3d33',
        },
        crop: {
          gold: '#eab308',
          leaf: '#16a34a',
          soil: '#78350f',
          water: '#0284c7',
          sun: '#f59e0b',
          alert: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
