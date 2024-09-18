<template>
  <div class="portfolio">
    <AnimationLoading :isLoading="isAnimationLoding"/>
    <div class="blockContainer">
      <div class="infoContainer">
        <div
          class="infoItem"
          v-for="(r, index) in infoList"
          :key="index"
          :index="index"
        >
          <a :href="r.url" target="_blank">
            <div style="display: flex; align-items: center;">
              <img :src="r.imagePath">
              <h2>{{ r.title }}</h2>
            </div>
          </a>
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
  import AnimationLoading from '@/components/AnimationLoading.vue'

  const { t } = useI18n()
  const isAnimationLoding = ref(false)

  const infoList = ref([
    {
      imagePath: 'images/portfolio/ball.png',
      title: t('i18n.portfolio.ballmeet'),
      url: 'http://ec2-13-231-43-217.ap-northeast-1.compute.amazonaws.com:4200',
      content: t('i18n.portfolio.ballmeetContent')
    }
  ])

  onMounted(async () => {
    isAnimationLoding.value = true
    setTimeout(() => {
      isAnimationLoding.value = false
    }, 2000)
  })
</script>

<style lang="scss" scoped>
  .portfolio{
    width: 100%;
    height: 90vh;
    overflow-y: auto;
    scroll-behavior: smooth;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: break-word;
  }

  .blockContainer{
    width: 90%;
    position: relative;
    height: auto;
  }

  .blockContainer > h3{
    color: grey;
  }

  .infoContainer{
    width: 100%;
    display: grid;
    margin-top: 30px;

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
