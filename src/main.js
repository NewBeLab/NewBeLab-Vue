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
import VueAxios from 'vue-axios'
import { axiosInstance } from '@/plugins/axios'

// vue-cookies
import { globalCookiesConfig } from "vue3-cookies"
import { setCookie } from '@/plugins/cookie'

// cookieのデフォルト設定。secure属性をつけたかった。
// 設定は公式ドキュメントそのまま。
globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

const pinia = createPinia()

const app = createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .use(VueAxios, axiosInstance)
  .use(setCookie)

// https://yarnpkg.com/package/vue-axios こちらを参考に設定
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
registerPlugins(app)
