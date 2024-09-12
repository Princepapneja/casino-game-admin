/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "skyblue",
        "secondary": "#1a2c38",
        "primary-light": "#87ceeb80",
        "secondary-light": "#D6E8F7",
        "tertiary": "#252e5f",
        "fourth": "#117FAA",
        "tertiary-light": "#E8CACE",
        "primary-foreground": "black",
        "background-foreground": "white",
        "secondary-foreground": "white",
        "desc": "#7e7e7e",
        "background": "#213743",
        "border": "#ecf3fa"
      },
      fontFamily: {
        "lexend": ['Lexend', 'sans-serif']

      }
    },
  },
  plugins: [],
}
