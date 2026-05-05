import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('./', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Бани 21 века',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      htmlAttrs: { lang: 'ru' },
      script: [
        {
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108358274','ym');ym(108358274,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referralUrl:document.referrer,accurateTrackBounce:true,trackLinks:true});`,
          type: 'text/javascript',
        },
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/108358274" style="position:absolute;left:-9999px;" alt="" /></div>',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/fonts', '@nuxt/ui'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  runtimeConfig: {
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin',
    memoryTtlMs: Number(process.env.MEMORY_TTL_MS || 30_000),
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

  nitro: {
    alias: {
      '~': projectRoot,
      '@': projectRoot,
    },
  },

  vite: {
    resolve: {
      alias: {
        '@': projectRoot,
        '~': projectRoot,
        '@scss': fileURLToPath(new URL('./assets/scss', import.meta.url)),
        '@fonts': fileURLToPath(new URL('./assets/scss/fonts', import.meta.url)),
      },
    },
  },
})
