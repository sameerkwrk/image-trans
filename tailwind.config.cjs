/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html"],
  theme: {},
  plugins: [require("flowbite/plugin"), require("daisyui")],
  daisyui: {
    themes: false,
  },
};
