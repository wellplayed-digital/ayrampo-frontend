// import { useLocalStorage } from '@vueuse/core'
import { en as vuetifyEn, es as vuetifyEs } from 'vuetify/locale'
import es from '~/locales/es-ES.json'
import en from '~/locales/en-US.json'

export default {
  legacy: false,
  messages: {
    'es-ES': {
      ...es,
      $vuetify: {
        ...vuetifyEs,
        dataIterator: {
          rowsPerPageText: 'Items por página:',
          pageText: '{0}-{1} of {2}'
        }
      }
    },
    'en-US': {
      ...en,
      $vuetify: {
        ...vuetifyEn,
        dataIterator: {
          rowsPerPageText: 'Items per page:',
          pageText: '{0}-{1} of {2}'
        }
      }
    }
  }
}
