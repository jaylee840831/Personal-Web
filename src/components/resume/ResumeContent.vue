<template>
  <div class="resumeContent">
    <div v-for="item in contentList"
      :key="item"
      :id="item"
      class="resumeContentItem"
    >
      <component :is="currentComponent(item)"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
  import About from './About.vue'
  import Achievement from './Achievement.vue'
  import Education from './Education.vue'
  import Experience from './Experience.vue'
  import Hobbit from './Hobbit.vue'
  import Portfolio from './Portfolio.vue'
  import Skill from './Skill.vue'

  const observer = ref<IntersectionObserver | null>(null)

  const props = defineProps({
    currentSelect: {
      type: String
    },
    resumeGuideList: {
      type: Array
    }
  })

  const emits = defineEmits([
    'scrollTarget'
  ])

  const contentList = ref([
    'about',
    'education',
    'skill',
    'experience',
    'portfolio',
    'achievement',
    'hobbit'
  ])

  const components = {
    About,
    Achievement,
    Education,
    Experience,
    Hobbit,
    Portfolio,
    Skill
    }

  function currentComponent(item: string | '') {
    if(item === 'about') return components.About
    else if(item === 'education') return components.Education
    else if(item === 'skill') return components.Skill
    else if(item === 'experience') return components.Experience
    else if(item === 'portfolio') return components.Portfolio
    else if(item === 'achievement') return components.Achievement
    else if(item === 'hobbit') return components.Hobbit
    else undefined

    return undefined
  }

  watch(() => props.currentSelect, (newValue: string | undefined) => {
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
        })
      },
      {
        root: scrollContainer[0],
        threshold: 0.5
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
    overflow-y: auto;
    scroll-snap-type: y;
    scroll-behavior: smooth;
  }

  .resumeContentItem{
    width: 100%;
    height: 100%;
    scroll-snap-align: center;
  }
</style>
