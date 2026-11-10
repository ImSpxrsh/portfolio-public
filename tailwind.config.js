/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
      },
      colors: {
        ink: "#1B1B1F",
        paper: "#FFF6E9",
        pink: "#FF7AB8",
        yellow: "#FFD23F",
        mint: "#4BE0A0",
        sky: "#7CCBFF",
        lilac: "#B9A2FF",
        orange: "#FF9548",
      },
      boxShadow: {
        pop: "4px 4px 0 0 #1B1B1F",
        "pop-lg": "7px 7px 0 0 #1B1B1F",
      },
    },
  },
  plugins: [],
};
