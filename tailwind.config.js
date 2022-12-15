/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}',
            './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
