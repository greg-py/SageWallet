import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "emerald",
      "pastel",
      "nord",
      "light",
      "dark",
      "bumblebee",
      "corporate",
      "fantasy",
      "dracula",
      "dim",
      "night",
      "sunset",
    ],
  },
};
