module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          black: {
            DEFAULT: '#1F2326',
            light: '#292C31',
            dark: '#1F2326'
          },
          red:{
            DEFAULT: '#FF4656',
            dark: '#FF4626'
          }
        }
      },
      spacing: {
        500: '1000px',
      }
    },
    screens: {
      xs: '350px',
      tiny: '400px',
      sm: '648px',
      md: '764px',
      lg: '1024px',
      xl: '1366px',
      '2xl': '1680px'
    },
  },
  plugins: [],
}
