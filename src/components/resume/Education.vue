<template>
  <div class="education">
    <div class="blockContainer">
      <h1>{{ t('i18n.education.title') }}</h1>
    </div>
    <div
      class="blockContainer" 
      v-for="(r, index) in schoolList"
      :key="index"
      :index="index"
    >
      <div class="schoolEmblem">
        <img :src="r.imagePath">
        <div class="lineBar"></div>
      </div>
      <div class="schoolContainer">
        <div class="title">
          <h2>{{ r.title }}</h2>
          <h3>{{ r.time }}</h3>
        </div>
        <div class="subTitle">
          <img src="/images/resume/school.png">
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
      <div class="schoolEmblem">
        <img src="/images/resume/tire.png">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const schoolList = ref([
    {
      imagePath: 'images/resume/klsh.png',
      title: t('i18n.education.degreeOfKLSH'),
      subTitle: t('i18n.education.klsh'),
      time: '2010/9 ~ 2013/6',
      content: t('i18n.education.contentOfKLSH')
    },
    {
      imagePath: 'images/resume/cjcu.svg',
      title: t('i18n.education.degreeOfCJCU'),
      subTitle: t('i18n.education.cjcu'),
      time: '2013/9 ~ 2017/6',
      content: t('i18n.education.contentOfCJCU')
    },
    {
      imagePath: 'images/resume/nkust.png',
      title: t('i18n.education.degreeOfNKUST'),
      subTitle: t('i18n.education.nkust'),
      time: '2017/9 ~ 2021/8',
      content: t('i18n.education.contentOfNKUST')
    }
  ])
</script>

<style lang="scss" scoped>
  .education{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 50px;

    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: break-word;
  }

  .blockContainer{
    width: 90%;
    display: flex;

    .schoolEmblem{
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

    .schoolContainer{
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

    .schoolEmblem{
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