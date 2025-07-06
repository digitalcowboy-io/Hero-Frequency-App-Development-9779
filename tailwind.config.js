/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          energy: '#F49558',
          action: '#D35E0E',
          depth: '#101F1F',
          foundation: '#244A49',
          expansion: '#409FA1',
          illumination: '#F6D541',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #F49558, 0 0 10px #F49558, 0 0 15px #F49558' },
          '100%': { boxShadow: '0 0 10px #F49558, 0 0 20px #F49558, 0 0 30px #F49558' },
        }
      }
    },
  },
  plugins: [],
}