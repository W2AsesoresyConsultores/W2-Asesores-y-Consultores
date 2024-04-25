const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primarycolor: '#407BFF',
        primarytext: '#061C3D',
        secundarycolor: '#407BFF',
        bgsecundary: '#F7F7FB',
        colorgreen: '#01C29E'
      },
      fontFamily: {
        'dmsans': ['"DM Sans", sans-serif']
      },
    },
  },
  plugins: [],
})
