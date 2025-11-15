// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(eslintConfigPrettier, {
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': ['error'],
  },
})
