/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./src/**/*.{js,jsx,ts,tsx}",

  ],

  theme: {

    extend: {

      keyframes: {

        'slide-in': {

          '0%': { transform: 'translateX(100%)' },

          '100%': { transform: 'translateX(0)' }

        },

        'slide-out': {

          '0%': { transform: 'translateX(0)' },

          '100%': { transform: 'translateX(100%)' }

        }

      },

      animation: {

        'slide-in': 'slide-in 0.3s ease-out',

        'slide-out': 'slide-out 0.3s ease-in'

      }

    },

  },

  plugins: [],

}
