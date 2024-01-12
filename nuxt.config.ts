// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],
  vite: {
    vue: {
      template: { transformAssetUrls }
    }
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/styles/main.scss'
  ],
  components: [
    { path: '~/components', prefix: '', pathPrefix: false }
  ]
})
