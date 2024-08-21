/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'lightest-grey': '#EBEBEB',
      'light-grey': '#C4C4C4',
      'med-grey': '#BBBBBB',
      'dark-grey': '#666666',
      transparent: 'transparent',
      'white': '#ffffff',
      'black': '#000000',
    },
    extend: {},
  },
  plugins: [],
}

