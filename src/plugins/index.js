/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import { createI18n } from 'vue-i18n';
import pt_BR from '@/i18n/pt_BR.json';
import { createPinia } from 'pinia'

const messages = { pt_BR };
const i18n = createI18n({
  locale: 'pt_BR',
  messages,
});
const pinia = createPinia()

export function registerPlugins (app) {
  app
    .use(i18n)
    .use(pinia)
    .use(vuetify)
    .use(router)
}
