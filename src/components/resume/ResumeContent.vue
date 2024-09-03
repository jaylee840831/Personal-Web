<template>
  <div class="resumeContent">
    <div v-for="item in contentList"
      :key="item"
      :id="item"
      class="resumeContentItem"
    >
      <component :is="currentComponent(item)"></component>
      <div class="mPowerContainer">
        <div class="stripe mPowerBlue"></div>
        <div class="stripe mPowerDarkBlue"></div>
        <div class="stripe mPowerRed"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import About from './About.vue'
  // import Achievement from './Achievement.vue'
  import Education from './Education.vue'
  import Experience from './Experience.vue'
  import Hobbit from './Hobbit.vue'
  // import Portfolio from './Portfolio.vue'
  import Skill from './Skill.vue'
  import { useAllStore } from '@/store/all'

  const allStore = useAllStore()
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
    // 'portfolio',
    // 'achievement',
    'hobbit'
  ])

  const components = {
    About,
    Education,
    Skill,
    Experience,
    // Portfolio,
    // Achievement,
    Hobbit
    }

  function currentComponent(item: string | '') {
    if(item === 'about') return components.About
    else if(item === 'education') return components.Education
    else if(item === 'skill') return components.Skill
    else if(item === 'experience') return components.Experience
    // else if(item === 'portfolio') return components.Portfolio
    // else if(item === 'achievement') return components.Achievement
    else if(item === 'hobbit') return components.Hobbit
    else undefined

    return undefined
  }

  watch(() => props.currentSelect, (newValue: string | undefined) => {
    const resumeContents = document.getElementsByClassName('resumeContentItem') as HTMLCollectionOf<HTMLDivElement>
    const scrollContainer = document.getElementsByClassName('resumeContent') as HTMLCollectionOf<HTMLDivElement>

    for(let i = 0; i < resumeContents.length; i++) {
      if(resumeContents[i].id === newValue) {
        scrollContainer[0].scrollTop = resumeContents[i].offsetTop - 100
        break
      }
    }
  }, { deep: true })

  // 開始觀察指定元素接觸到父層或視窗
  function startListenViewPort() {
    const scrollContainer = document.getElementsByClassName('resumeContent') as HTMLCollectionOf<HTMLDivElement>

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            emits('scrollTarget', entry.target.id)
            allStore.setResumeScroll(entry.target.id)
          }
        })
      },
      {
        root: scrollContainer[0],
        threshold: 0.2
      }
    )

    const itemElements = scrollContainer[0].querySelectorAll('.resumeContentItem')
    itemElements.forEach((el: Element) => {
      observer.value?.observe(el)
    })
  }

  // 結束觀察指定元素接觸到父層或視窗
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
    height: 90vh;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .resumeContentItem{
    position: relative;
    width: 100%;
    height: auto;
    // animation-name: example;
    // animation-duration: 2s;
  }

  // @keyframes example {
  //   0% {
  //     transform: translateX(-100%); /* 从屏幕左侧开始 */
  //     opacity: 0;
  //   }
  //   100% {
  //     transform: translateX(0); /* 移动到原始位置 */
  //     opacity: 1;
  //   }
  // }
</style>
