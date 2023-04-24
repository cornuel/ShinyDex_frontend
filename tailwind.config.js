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
        combat: '#ff8100',
        psy:'#ef3f7a',
        poison:'#923fcc',
        dragon:'#4f60e2',
        spectre:'#703f70',
        tenebres:'#4f3f3d',
        sol:'#92501b',
        feu:'#e72324',
        fee:'#ef70ef',
        eau:'#2481ef',
        vol:'#82baef',
        normal:'#a0a2a0',
        roche:'#b0aa82',
        electrik:'#fac100',
        insecte:'#92a212',
        plante: '#3da224',
        glace:'#3dd9ff',
        acier:'#60a2b9',
        hp:'#ff6384',
        atq:'#ff9f40',
        def:'#4bc0c0',
        spa:'#ffcd56',
        spd:'#36a2eb',
        spe:'#9966ff',
        themeYellow: '#fef3c7',
        themeGray: '#e5e6e9'
      }
    },
  },
  variants: {},
  plugins: [],
  safelist: [{
      pattern: /(bg|text|border)-(themeYellow|themeGray|combat|psy|poison|dragon|spectre|tenebres|sol|feu|fee|eau|vol|normal|roche|electrik|insecte|plante|glace|acier|hp|atq|def|spa|spd|spe)/
    },
  ],
}
