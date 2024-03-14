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
      fontFamily: {
        // Amita: ["Amita", "serif"],
        // Rouge: ["Rouge Script", cursive]
       },
       
    },
  },
  plugins: [],
}

