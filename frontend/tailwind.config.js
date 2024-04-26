/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': {'min': '390px', 'max': '767px'},
      'tablet': {'min': '768px', 'max': '1023px'},
      'laptop': {'min': '1024px'},
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}