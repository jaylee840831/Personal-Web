import { createApp } from 'vue'
import App from './App.vue'
import './style/all.scss'
import router from './router'
import i18n from '@/composables/useI18n'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)
app.use(router) // vue router
app.use(i18n)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
