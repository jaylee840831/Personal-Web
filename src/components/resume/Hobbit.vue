<template>
  <div class="hobbit">
    <div class="blockContainer">
      <h1>{{ t('i18n.hobbies.title') }}</h1>
    </div>
    <div class="blockContainer">
      <div class="infoContainer">
        <div
          class="infoItem infoItemOfHobbit"
          v-for="(r, index) in infoList"
          :key="index"
          :index="index"
        >
          <div style="display: flex; align-items: center;">
            <img :src="r.imagePath">
            <h2>{{ r.title }}</h2>
          </div>
          <span style="max-width: 500px;">
            {{ r.content }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAllStore } from '@/store/all'

  const { t } = useI18n()
  const allStore = useAllStore()

  const infoList = ref([
    {
      imagePath: 'images/resume/ball.png',
      title: t('i18n.hobbies.basketball'),
      content: t('i18n.hobbies.basketballContent')
    },
    {
      imagePath: 'images/resume/hangout.png',
      title: t('i18n.hobbies.hangOut'),
      content: t('i18n.hobbies.hangOutContent')
    },
    {
      imagePath: 'images/resume/workout.png',
      title: t('i18n.hobbies.workout'),
      content: t('i18n.hobbies.workoutContent')
    },
    {
      imagePath: 'images/resume/code.png',
      title: t('i18n.hobbies.coding'),
      content: t('i18n.hobbies.codingContent')
    }
  ])

  function addAnimation() {
    const items = document.getElementsByClassName('infoItemOfHobbit')
    for (let i = 0; i < items.length; i++) {
      if (i % 2 === 0) items[i].classList.add('fadeInFromLeft')
      else items[i].classList.add('fadeInFromRight')
    }
  }

  function removeAnimation() {
    const items = document.getElementsByClassName('infoItemOfHobbit')
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('fadeInFromLeft')
      items[i].classList.remove('fadeInFromRight')
    }
  }

  watch(() => allStore.currentResumeScroll, (newValue: string) => {
    if(newValue === 'hobbit') addAnimation()
    else removeAnimation()
  }, { deep: true })
</script>

<style lang="scss" scoped>
  .hobbit{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 50px;
    overflow-x: hidden !important;

    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: break-word;
  }

  .blockContainer{
    width: 90%;
    display: flex;
  }

  .infoContainer{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    .infoItem {
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;

      img{
        width: 28px;
        height: 28px;
        margin-right: 5px;
      }
    }
  }

  .fadeInFromLeft{
    animation: animatefromLeft 1s forwards;
  }

  @keyframes animatefromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .fadeInFromRight{
    animation: animatefromRight 1s forwards;
  }

  @keyframes animatefromRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @media (max-width: 759px) {
    h1{
      font-size: 24px;
    }

    h2{
      font-size: 18px;
    }

    h3{
      font-size: 16px;
    }
  }

  @media (min-width: 1280px) {
    .infoContainer {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>