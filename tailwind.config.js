/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add any new folder that uses className here.
  content: ["./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          light: "#818CF8",
          dark: "#3730A3",
        },
      },
    },
  },
  plugins: [],
};
