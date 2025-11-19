import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Бани 21 века',
      app: {
        head: {
          link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
        },
      },
    },
  },
  htmlAttrs: {
    lang: 'ru',
  },
  css: ['../assets/scss/main.scss'],

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/fonts'],

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [200, 300, 400, 500, 600, 700, 800, 900],
        subsets: ['latin', 'cyrillic'],
        display: 'swap',
      },
    ],
  },

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@scss': fileURLToPath(new URL('./assets/scss', import.meta.url)),
        '@fonts': fileURLToPath(new URL('./assets/scss/fonts', import.meta.url)),
      },
    },
  },
})
