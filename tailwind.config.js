module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.tsx',
    ]
  },
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
