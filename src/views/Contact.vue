<template>
  <div class="contact">
    <AnimationLoading :isLoading="isAnimationLoding"/>
    contact
  </div>
</template>

<script setup lang="ts">
  import AnimationLoading from '@/components/AnimationLoading.vue';

  const isAnimationLoding = ref(false)

  onMounted(() => {
    isAnimationLoding.value = true

    setTimeout(() => {
      isAnimationLoding.value = false
    }, 2000)
  })
</script>

<style lang="scss" scoped>
</style>
