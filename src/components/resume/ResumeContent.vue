<template>
  <div class="resumeContent">
    <div id="about" class="resumeContentContainer">1</div>
    <div id="education" class="resumeContentContainer">2</div>
    <div id="skill" class="resumeContentContainer">3</div>
    <div id="experience" class="resumeContentContainer">4</div>
    <div id="portfolio" class="resumeContentContainer">5</div>
    <div id="achievement" class="resumeContentContainer">6</div>
    <div id="hobbit" class="resumeContentContainer">7</div>
  </div>
</template>

<script setup lang="ts">
  // import { useI18n } from 'vue-i18n'

  // const { t } = useI18n()
  const props = defineProps({
    currentSelect: {
      type: String
    },
    resumeGuideList: {
      type: Array
    }
  })

  watch(() => props.currentSelect, (newValue) => {
    const resumeContents = document.getElementsByClassName('resumeContentContainer') as HTMLCollectionOf<HTMLDivElement>
    const scrollContainer = document.getElementsByClassName('resumeContent') as HTMLCollectionOf<HTMLDivElement>

    for(let i = 0; i < resumeContents.length; i++) {
      if(resumeContents[i].id === newValue) {
        // scrollContainer[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
        scrollContainer[0].scrollTop = resumeContents[i].offsetTop
      }
    }
  }, { deep: true })
</script>

<style lang="scss" scoped>
  .resumeContent{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .resumeContentContainer{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
  }
</style>
