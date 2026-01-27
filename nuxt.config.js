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

  runtimeConfig: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD || '',
      db: Number(process.env.REDIS_DB || 0),
    },
    cache: {
      redisKey: process.env.REDIS_KEY || 'app:data',
      memoryTtlMs: Number(process.env.MEMORY_TTL_MS || 60_000),
      redisPullMs: Number(process.env.REDIS_PULL_MS || 60_000),
      dbPushMs: Number(process.env.DB_PUSH_MS || 60_000),
    },
  },

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
