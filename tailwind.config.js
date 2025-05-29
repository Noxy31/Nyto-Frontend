/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#EFD9CE',
        lavender: '#DEC0F1',
        teal: '#50C5B7',
        blue: '#496DDB',
        'dark-green': '#14342B',
      },
    },
  },
  plugins: [],
}