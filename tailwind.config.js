/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up 0.2s ease-out',
        'bounce': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};