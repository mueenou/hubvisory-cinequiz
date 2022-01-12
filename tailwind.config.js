module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#87428a",
        light: "#deacd8",
        secondary: "#dbc4c9",
        lighter: "#e4cce7",
      },
    },
    fontFamily: {
      serif: ["Yuji Syuku", "serif"],
      script: ["Handlee", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
