import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", daisyui.content()],
  theme: {
    extend: {},
  },
  plugins: [daisyui.plugin()],
};
