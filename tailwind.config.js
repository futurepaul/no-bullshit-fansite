module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "bullshit-orange": "#FCE389",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
