/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        botmatata: {
          green: '#02d980',
          yellow: '#FFDB58',
          coral: '#003366',
          blue: '#02d980',
          lavender: '#E6A8D7',
        },
      },
    },
  },
  plugins: [],
};