/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { primary: '#6d4cf4', secondary: '#f579ad', accent: '#272044' },
      fontFamily: { bangla: ['"Hind Siliguri"', 'sans-serif'] },
      boxShadow: { card: '0 8px 24px rgba(91, 66, 168, 0.1)' }
    }
  },
  plugins: []
};
