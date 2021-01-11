module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        blacks: {
          900: '#09090b',
          700: '#16171C',
          500: '#262730',
          300: '#373844',
        },
      },
      screens: {
        md: '640px',
      },
    },
  },
  variants: {},
  plugins: [],
}
