import { createVuetify } from 'vuetify'
import { es } from 'vuetify/locale'
import colors from 'vuetify/util/colors'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    locale: {
      locale: 'es',
      messages: { es }
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: colors.amber.base
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
