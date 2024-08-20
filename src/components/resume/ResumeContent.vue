<template>
  <div class="resumeContent">
    <div v-for="item in contentList"
      :key="item"
      :id="item"
      class="resumeContentItem"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { useI18n } from 'vue-i18n'

  // const { t } = useI18n()
  const observer = ref<IntersectionObserver | null>(null)

  const props = defineProps({
    currentSelect: {
      type: String
    },
    resumeGuideList: {
      type: Array
    }
  })

  const emits = defineEmits(['scrollTarget'])

  const contentList = ref([
    "about",
    "education",
    "skill",
    "experience",
    "portfolio",
    "achievement",
    "hobbit"
  ])

  watch(() => props.currentSelect, (newValue) => {
    const resumeContents = document.getElementsByClassName('resumeContentItem') as HTMLCollectionOf<HTMLDivElement>
    const scrollContainer = document.getElementsByClassName('resumeContent') as HTMLCollectionOf<HTMLDivElement>

    for(let i = 0; i < resumeContents.length; i++) {
      if(resumeContents[i].id === newValue) {
        scrollContainer[0].scrollTop = resumeContents[i].offsetTop
        break
      }
    }
  }, { deep: true })

  // 開始監聽可視窗口當前元素
  function startListenViewPort() {
    const scrollContainer = document.getElementsByClassName('resumeContent') as HTMLCollectionOf<HTMLDivElement>

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            emits('scrollTarget', entry.target.id)
          }
        });
      },
      {
        root: scrollContainer[0],
        threshold: 1
      }
    )

    const itemElements = scrollContainer[0].querySelectorAll('.resumeContentItem')
    itemElements.forEach((el: Element) => {
      observer.value?.observe(el)
    })
  }

  // 結束監聽可視窗口當前元素
  function endListenViewPort() {
    observer.value?.disconnect()
  }

  onMounted(() => {
    startListenViewPort()
  })

  onBeforeUnmount(() => {
    endListenViewPort()
  })
</script>

<style lang="scss" scoped>
  .resumeContent{
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }

  .resumeContentItem{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    scroll-snap-align: center;
  }
</style>
