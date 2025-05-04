/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Background colors
        bgDark: "#0E1828",
        bgLight: "#E3EEFF",

        // Primary colors
        blueA: "#4B8DFD",
        grayA: "#757575",
        grayB: "#A2A2A2",
        grayC: "#EAEAEA",

        // Secondary colors
        secondaryDark: "#19263B",
        secondaryLight: "#FFFFFF",

        // Border colors
        borderDark: "#2F3E50",
        borderLight: "#D7DAE0",

        // Extras
        redError: "#EC6853",
      },
      fontFamily: {
        dmSans600: ["DMSans_600SemiBold", "sans-serif"],
        inter100: ["Inter_100Thin", "sans-serif"],
        inter200: ["Inter_200ExtraLight", "sans-serif"],
        inter300: ["Inter_300Light", "sans-serif"],
        inter400: ["Inter_400Regular", "sans-serif"],
        inter500: ["Inter_500Medium", "sans-serif"],
        inter600: ["Inter_600SemiBold", "sans-serif"],
        inter700: ["Inter_700Bold", "sans-serif"],
        inter800: ["Inter_800ExtraBold", "sans-serif"],
        inter900: ["Inter_900Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
