import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Line E-commerce',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/scss/index.scss', 'primeicons/primeicons.css'],
  devtools: {enabled: true},
  image: {},
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        }
      }
    }
  }
})