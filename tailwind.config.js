/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        Mont: ["Montserrat", "sans-serif"],
      },
      aspectRatio: {
        "21/9": "21 / 9",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
