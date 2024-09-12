/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#704380",
        "primary-light": "#F9F1E7",
        "secondary-light": "#D6E8F7",
        "secondary": "#EF601E",
        "tertiary-light": "#E8CACE",
        "tertiary": "#ecb035",
        "fourth": "#117FAA",
        "text": "#3d144b",
        "desc": "#7e7e7e",
        //  "primary-light":"#D6E8F7",
        "background": "#f2f2f3",
        "border": "#ecf3fa"
      },
      fontFamily: {
        "lexend": ['Lexend', 'sans-serif']

      }
    },
  },
  plugins: [],
}
