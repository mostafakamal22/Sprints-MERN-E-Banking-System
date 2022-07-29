/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans"],
      },

      backgroundImage: () => ({
        "header-desktop": "url('/src/assets/imgs/bg-intro-desktop.svg')",
        "header-mobile": "url('/src/assets/imgs/bg-intro-mobile.svg')",
      }),
      backgroundSize: {
        "custom-mobile-header-size": "100% 50%",
        "custom-mobile-mockup-size": "auto 50%",
      },
    },
  },
  plugins: [],
};
