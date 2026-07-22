/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f5f0ff', 100: '#ede5ff', 200: '#ddd0ff', 300: '#c4adff', 400: '#a67dff', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
        accent: { 50: '#fdf2f8', 100: '#fce7f1', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777' },
        surface: { light: '#f8f7fc', card: '#ffffff', muted: '#f3f1f9' }
      },
      fontFamily: { bangla: ['"Hind Siliguri"', 'sans-serif'] },
      boxShadow: {
        card: '0 2px 12px rgba(109,76,244,0.08)',
        'card-hover': '0 8px 28px rgba(109,76,244,0.15)',
        nav: '0 2px 16px rgba(0,0,0,0.06)',
        hero: '0 20px 50px rgba(109,76,244,0.12)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.75rem'
      }
    }
  },
  plugins: []
};
