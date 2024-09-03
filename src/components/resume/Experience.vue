<template>
  <div class="experience">
    <div class="blockContainer">
      <h1>{{ t('i18n.experience.title') }}</h1>
    </div>
    <div
      class="blockContainer" 
      v-for="(r, index) in companyList"
      :key="index"
      :index="index"
    >
      <div class="companyEmblem">
        <img :src="r.imagePath">
        <div class="lineBar"></div>
      </div>
      <div class="companyContainer">
        <div class="title">
          <h2>{{ r.title }}</h2>
          <h3>{{ r.time }}</h3>
        </div>
        <div class="subTitle">
          <img src="/images/resume/company.png">
          <span>{{ r.subTitle }}</span>
        </div>
        <div v-if="r.content !== ''" style="padding-bottom: 50px;">
          <span>{{ r.content }}</span>
        </div>
        <div v-else style="padding-bottom: 100px;">
        </div>
      </div>
    </div>
    <div class="blockContainer">
      <div class="companyEmblem">
        <img src="/images/resume/tire.png">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAllStore } from '@/store/all'

  const { t } = useI18n()
  const allStore = useAllStore()

  const companyList = ref([
    {
      imagePath: 'images/resume/company1.jpg',
      title: t('i18n.experience.jobTitleOfCompany1'),
      subTitle: t('i18n.experience.company1'),
      time: '2019/6 ~ 2019/11',
      content: t('i18n.experience.contentOfCompany1')
    },
    {
      imagePath: 'images/resume/company2.png',
      title: t('i18n.experience.jobTitleOfCompany2'),
      subTitle: t('i18n.experience.company2'),
      time: '2021/10 ~ 2022/4',
      content: t('i18n.experience.contentOfCompany2')
    },
    {
      imagePath: 'images/resume/company3.png',
      title: t('i18n.experience.jobTitleOfCompany3'),
      subTitle: t('i18n.experience.company3'),
      time: '2022/5 ~ 2022/11',
      content: t('i18n.experience.contentOfCompany3')
    },
    {
      imagePath: 'images/resume/company4.jpg',
      title: t('i18n.experience.jobTitleOfCompany4'),
      subTitle: t('i18n.experience.company4'),
      time: '2023/4 ~',
      content: t('i18n.experience.contentOfCompany4')
    },
  ])

  function addAnimation() {
    const emblems = document.getElementsByClassName('companyEmblem')
    for (let i = 0; i < emblems.length; i++) {
      const emblemImg = emblems[i].querySelectorAll('img')
      emblemImg[0].classList.add('flip')
    }
  }

  function removeAnimation() {
    const emblems = document.getElementsByClassName('companyEmblem')
    for (let i = 0; i < emblems.length; i++) {
      const emblemImg = emblems[i].querySelectorAll('img')
      emblemImg[0].classList.remove('flip')
    }
  }

  watch(() => allStore.currentResumeScroll, (newValue: string) => {
    if(newValue === 'experience') addAnimation()
    else removeAnimation()
  }, { deep: true })
</script>

<style lang="scss" scoped>
  .experience{
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

    .companyEmblem{
      display: flex;
      flex-direction: column;

      img{
        width: 80px;
        height: 80px;
        background-color: white;
        border-radius: 50%;
        border: 5px lightgray solid;
      }

      .lineBar{
        width: 4px;
        height: 100%;
        margin-left: 50%;
        background-color: lightgray;
      }
    }

    .companyContainer{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-left: 10px;

      .title{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      
      .subTitle{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding-bottom: 20px;

        img{
          width: 28px;
          height: 28px;
        }
      }
    }
  }

  .flip{
    animation: animateFlip 2s forwards;
  }

  @keyframes animateFlip {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(180deg);
    }
    100% {
        transform: rotateY(360deg);
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

    .companyEmblem{
      display: flex;
      flex-direction: column;

      img{
        width: 50px !important;
        height: 50px !important;
        background-color: white;
        border-radius: 50%;
        border: 5px lightgray solid;
      }
    }
  }
</style>