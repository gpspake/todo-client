module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'hover', 'group-hover', 'focus'],
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
