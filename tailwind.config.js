/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bg-gray':'#212528',
        'bg-btn': '#e06b4c',
        'bg-box-gray': '#292b2d',
        'text-gray': '#747276',
      },
    },
  },
  plugins: [],
}

