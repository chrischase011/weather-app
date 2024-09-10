import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    openWeatherMapApiKey: process.env.OPEN_WEATHER_MAP_API_KEY,
  },
  build: {
    transpile: ['vuetify'],
  },
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  css: [
    '~/assets/main.scss'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [(_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      // @ts-expect-error
      config.plugins.push(vuetify({ autoImport: true }))
    })
  },
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})