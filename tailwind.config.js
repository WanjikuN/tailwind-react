/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
        sta: "yellow",
      },
    },
  },
  plugins: [],
};
