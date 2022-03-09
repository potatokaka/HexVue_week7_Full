import { createApp } from 'vue'

// bootstrap
import 'bootstrap'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vee Validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// loading-overlay
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import { currency, date } from '@/methods/filters'
import $httpMessageState from '@/methods/pushMessageState'
import App from './App.vue'
import router from './router'

// Vee Validate 定義規則
defineRule('required', required)
defineRule('email', email)
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: false // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW') // 設定預設語系

const app = createApp(App)

// 將 currency, date 加入全域下，這樣在其他地方就能直接使用
app.config.globalProperties.$filters = {
  currency,
  date
}
// 改寫成 provide 的寫法：app.provide('$filters', { currency, date })
// 將 $httpMessageState 加入全域下，這樣在其他地方就能直接使用
app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(router)
app.use(VueAxios, axios)

// Vee Validate 註冊元件
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
// Loading Overlay
app.component('Loading', Loading)

app.mount('#app')
