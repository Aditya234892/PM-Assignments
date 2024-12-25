/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'color-change': {
          '0%, 100%': { color: '#FF0000' }, // Red
          '25%': { color: '#00FF00' },     // Green
          '50%': { color: '#0000FF' },     // Blue
          '75%': { color: '#FFFF00' },     // Yellow
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'color-change': 'color-change 8s infinite',
      }
    }
  },
  plugins: [ require('tailwind-scrollbar')],
}