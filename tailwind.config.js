/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs,js}"],
  theme: {

    extend: {},
    
    
  },
   daisyui: {
    themes: ['cyberpunk'],
  },
 plugins: [require('@tailwindcss/typography'), require('daisyui')],

}