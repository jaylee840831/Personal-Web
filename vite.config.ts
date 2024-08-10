import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  base: '/Resume', // 根目錄從指定的資料夾開始
  plugins: [
    vue(),
    AutoImport({
      // 自動導入 Vue 和 Vue Router 的 API
      imports: ['vue', 'vue-router'],
      vueTemplate: true,
      dts: true,  // 生成的類型定義文件路徑
      eslintrc: {
        enabled: false, // 產生 .eslintrc-auto-import.json
        filepath: ('./.eslintrc-auto-import.json')
      }
    }),
    Components({
      dts: true, // 生成 TypeScript 類型定義文件
    })
  ],
  resolve: {
    alias: {
      // 設定'@'指向'src'
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0', //啟動NetWork 本地ip
    port: 8086,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
