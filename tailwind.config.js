/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: "'Nunito', sans-serif",
        rubik: "'Rubik', sans-serif",
      },
      colors: {
        combat: '#ce4069',
        psy:'#f97176',
        poison:'#ab6ac8',
        dragon:'#0a6dc4',
        spectre:'#5269ac',
        tenebres:'#5a5366',
        sol:'#d97746',
        feu:'#ff9c54',
        fee:'#ec8fe6',
        eau:'#4d90d5',
        vol:'#8fa8dd',
        normal:'#9099a1',
        roche:'#c7b78b',
        electrik:'#f3d23b',
        insecte:'#90c12c',
        plante: '#63bb5b',
        glace:'#74cec0',
        acier:'#5a8ea1',
        hp:'#ff6384',
        atq:'#ff9f40',
        def:'#4bc0c0',
        spa:'#ffcd56',
        spd:'#36a2eb',
        spe:'#9966ff',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
