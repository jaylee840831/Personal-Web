import { createApp } from 'vue'
import App from './App.vue'
import './style/all.scss'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router) // vue router
app.use(ElementPlus)
app.mount('#app')
