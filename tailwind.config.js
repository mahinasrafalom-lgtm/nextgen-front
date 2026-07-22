/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { primary: '#e6a900', secondary: '#ffc400', accent: '#252525' },
      fontFamily: { bangla: ['"Hind Siliguri"', 'sans-serif'] },
      boxShadow: { card: '0 6px 20px rgba(24, 63, 31, 0.08)' }
    }
  },
  plugins: []
};
