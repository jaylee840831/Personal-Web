import { createApp } from 'vue'
import App from './App.vue'
import './style/all.scss'
import router from './router'
import i18n from '@/composables/useI18n'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const pinia = createPinia()

const app = createApp(App)
app.use(router) // vue router
app.use(i18n)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
