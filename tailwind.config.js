/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5500",
          complementary: "#0099ff",
        },
        green: {
          DEFAULT: "#1aff00",
        },
        blue: {
          DEFAULT: "#0099ff",
        },
        purple: {
          DEFAULT: "#e600ff",
        },
        // secondary: {
        //   DEFAULT: "#1d1d1d",
        // },
        dark: {
          50: "#090a0b",
          100: "#121517",
          200: "#171a1d",
          300: "#1b1f23",
          400: "#202428",
          500: "#24292e",
          600: "#3f4448",
          700: "#5b5f62",
          800: "#76797c",
          900: "#adafb1",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
