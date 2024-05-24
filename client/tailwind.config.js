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
      {
        budget: {
          primary: "#3AAFA9",
          secondary: "#2B7A78",
          accent: "#DEF2F1",
          neutral: "#17252A",
          "base-100": "#FEFFFF",
          "base-200": "#F1F5F5",
          "base-content": "#333333",
          info: "#A6E3E9",
          success: "#76C7C0",
          warning: "#FFDD57",
          error: "#FF6F61",
        },
      },
    ],
  },
};
