module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#002855",
          "primary-focus": "mediumblue",
          secondary: "#eaaa00",
          accent: "#0b4484",
        },
      },
    ],
  },
};
