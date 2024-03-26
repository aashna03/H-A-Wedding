/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      xs: '400px',
      sm: '480px',
      // mmd:'515px',
      md: '768px',
      lg: '976px',
      lgxl:'1308px',
      xl: '1440px',
    },
    fontSize: {
      xs: '0.6rem',
      smsm: '0.7rem',
      sm: '0.8rem',
      base: '1rem',
      mid: '1.25rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      // '4hxl': '2.48rem',
      '5xl': '3.052rem',
      '6xl': '4.501rem',
      '7xl': '5.501rem',
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
      widest: '.25em',
    },
    extend: {
      flex: {
        '2': '0 0 100%'
      },
      colors: {
        'ganesha': '#E6BF96',
        'invite_text': '#af4e29',
        'name_text' : '#466100',
        'address_head': '#51622f',
        'address_text' : '#8d4450',
        'mytxt' : '#b0733f',
        'mymytxt' : '#6c4727',
        'countdwn' :'#3b6069',
        'andd' : '#456743',
        'durgaji' : '#a9cec3',
        'shyamji' : '#a9cec3',
        'haldath' : '#e3d8b5',
        'mayra' : '#ebcaca',
        'sangeet' : '#ffc9d1',
        'haldi' : '#e3d8b5',
        'nikasii' : '#fbfcec',
        'wed' : '#ebcaca',

      },
      fontFamily: {
        // Amita: ["Amita", "serif"],
        // Rouge: ["Rouge Script", cursive]
       },
       
    },
  },
  plugins: [],
}

