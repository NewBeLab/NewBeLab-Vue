/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// vuetify
import vuetify from './plugins/vuetify'

// vue-router
import router from './plugins/router'

// pinia
import { createPinia } from 'pinia'

// axios
// https://www.npmjs.com/package/vue-axios こちらを参考に設定
// .provide('axios', app.config.globalProperties.axios) がないとthis.$axiosが使えない?
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()

const app = createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VueAxios, axios)
  .provide('axios', app.config.globalProperties.axios)
  .mount('#app')

registerPlugins(app)
