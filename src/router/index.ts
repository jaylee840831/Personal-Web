import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Resume from '../views/Resume.vue'
import Contact from '../views/Contact.vue'

// 定義路由的型別
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Resume
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  // path需要跟vite.config.ts的base一致
  // history: createWebHistory(import.meta.env.VITE_ROOT_PATH),
  // history: createWebHistory('/Resume'),
  history: createWebHashHistory('/Resume/'),
  routes
})

export default router