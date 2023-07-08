/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '1/2': '50%',
      },
      translate: {
        '-1/2': '-50%',
      },
    },
  },
  plugins: [],
};
