/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '810px', lg: '1200px' },
    extend: {
      colors: {
        ink: '#f5f2eb',
        surface: '#ffffff',
        line: '#ddd6cb',
        'line-soft': '#c9c0b3',
        accent: '#a88962',
        'accent-dark': '#8a6f4d',
        'accent-tint': '#f0e8dc',
        yala: '#1b4fd8',
        'yala-ink': '#0e348f',
        paper: '#16140f',
        muted: '#6b6560',
        'muted-light': '#8a847c',
        dark: '#16140f',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['clamp(2.5rem, 7vw, 4.5rem)', { lineHeight: '0.95' }],
        'display-md': ['clamp(3.5rem, 10vw, 7.5rem)', { lineHeight: '0.92' }],
        'display-lg': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.88' }],
        'display-xl': ['clamp(4.5rem, 14vw, 14rem)', { lineHeight: '0.85' }],
      },
      letterSpacing: {
        display: '0.02em',
        wide: '0.08em',
        wider: '0.14em',
        widest: '0.24em',
      },
      maxWidth: { shell: '1400px' },
      transitionTimingFunction: { framer: 'cubic-bezier(0.44, 0, 0.14, 1)' },
    },
  },
  plugins: [],
};
