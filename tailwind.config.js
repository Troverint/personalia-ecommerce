module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'poppins' : ['Poppins'],
        'bilbo' : ['Bilbo Swash Caps']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
}
