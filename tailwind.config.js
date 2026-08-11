/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f1',
          100: '#dcebde',
          200: '#bbd6be',
          300: '#8fba94',
          400: '#629868',
          500: '#447a4b',
          600: '#34613a',
          700: '#2a4d30',
          800: '#243e29',
          900: '#1d3222',
          950: '#0f1c13',
        },
        leaf: {
          50: '#f4faf0',
          100: '#e6f5d6',
          200: '#cfe9ad',
          300: '#aed77e',
          400: '#8fc258',
          500: '#6fa938',
          600: '#548628',
          700: '#416820',
          800: '#36521e',
          900: '#2e451d',
        },
        earth: {
          50: '#faf7f2',
          100: '#f1e9dc',
          200: '#e2d2b8',
          300: '#d0b58a',
          400: '#bd9762',
          500: '#a87e48',
          600: '#8c663b',
          700: '#715032',
          800: '#5d422c',
          900: '#4d3826',
        },
        charcoal: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#d6d3d1',
          300: '#b8b3af',
          400: '#928680',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#2c2825',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 28, 19, 0.06), 0 1px 2px rgba(15, 28, 19, 0.04)',
        'card-hover': '0 4px 12px rgba(15, 28, 19, 0.08), 0 2px 4px rgba(15, 28, 19, 0.04)',
        'card-lg': '0 10px 30px rgba(15, 28, 19, 0.08), 0 4px 8px rgba(15, 28, 19, 0.04)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-fast': 'fade-in-fast 0.2s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
