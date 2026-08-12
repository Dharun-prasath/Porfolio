/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#060608',
        'card-bg': '#121216',
        'accent-purple': '#6B21A8',
        'border-glow': 'rgba(107, 33, 168, 0.4)',
      },
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],
        serif: ['Josefin Sans', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(20px, -30px) scale(1.02)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.98)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
