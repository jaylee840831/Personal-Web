<template>
  <AppHeader style="width: 100vw !important;"></AppHeader>
  <router-view style="width: 100vw !important;"></router-view>
</template>

<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue'
  import { useAllStore } from '@/store/all'

  const allStore = useAllStore()

  watchEffect(() => {
    // 監聽視窗大小變化
    const handleResize = () => {
      setTimeout(() => {
        allStore.setAppWidth(window.innerWidth)
        allStore.setAppHeight(window.innerHeight)
      }, 200)
    }

    handleResize() // 初始先執行一次監聽視窗大小變化
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
</script>

<style scoped>
</style>
