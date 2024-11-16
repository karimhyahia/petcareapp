/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef8fe',
          100: '#d8effd',
          200: '#b8e3fb',
          300: '#8ed2f8',
          400: '#54b9f0', // brand primary
          500: '#29a3e5',
          600: '#1a88d1',
          700: '#176ca8',
          800: '#185a89',
          900: '#1a4b71',
        },
        secondary: {
          50: '#f0f3f9',
          100: '#dce3f1',
          200: '#bfcce5',
          300: '#96acd4',
          400: '#6c87bf',
          500: '#4e69aa',
          600: '#1f3e81', // brand secondary
          700: '#2b3c7c',
          800: '#263365',
          900: '#242e54',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};