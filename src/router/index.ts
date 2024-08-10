import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Resume from '../views/Resume.vue'

// 定義路由的型別
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Resume',
    component: Resume
  },
];

const router = createRouter({
  // path需要跟vite.config.ts的base一致
  history: createWebHistory('/Resume'),
  routes
});

export default router