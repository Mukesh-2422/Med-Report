/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F5F3EE',
        surface: '#FCFBF8',
        forest: '#173C35',
        sage: '#A8B8A5',
        champagne: '#C8A96B',
        charcoal: '#202522',
        muted: '#707772',
        border: '#DCDDD6',
        warning: '#B77A32',
        success: '#2F6B55',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(32, 37, 34, 0.04), 0 1px 1px rgba(32, 37, 34, 0.03)',
      },
    },
  },
  plugins: [],
}
