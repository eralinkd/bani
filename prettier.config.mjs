/** @type {import('prettier').Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 100,
  importOrder: ['^vue(.*)$', '^nuxt(.*)$', '^@?\w', '^(@|~)/', '^\./', '^\.\./'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
