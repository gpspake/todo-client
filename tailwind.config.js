module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'hover', 'group-hover', 'focus'],
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
