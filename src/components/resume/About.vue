<template>
  <div class="about">
    <div class="blockContainer welcomeContainer">
      <div class="welcomeItem">
        <h1>
          {{ t('i18n.about.welcomeTitle') }}
        </h1>
        <div class="infoContainer">
          <div
            class="infoItem"
            v-for="(r, index) in infoList"
            :key="index"
            :index="index"
          >
            <img :src="r.imagePath">
            <a
              v-if="r.hrefPath !== ''"
              :href="r.hrefPath"
              target="_blank"
            >
              <span>
                {{ r.content }}
              </span>
            </a>
            <span v-else>
              {{ r.content }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="welcomeItem"
        style="display: flex; flex-wrap: wrap; justify-content: flex-end;"
      >
        <el-avatar
          :size="200"
          src="images/user.png"
        />
      </div>
    </div>
    <div class="blockContainer">
      <span>
        {{ t('i18n.about.introdueContent') }}
      </span>
    </div>
    <div class="blockContainer contactContainer">
      <el-tooltip
        v-for="(r, index) in contactList"
        :key="index"
        :index="index"
        :content="r.content"
        placement="top"
        effect="customized"
      >
        <a
          v-if="r.hrefPath !== ''"
          :href="r.hrefPath"
          target="_blank"
        >
          <img :src="r.imagePath">
        </a>
        <img v-else :src="r.imagePath">
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const infoList = ref([
    {
      imagePath: 'images/resume/location.png',
      hrefPath: '',
      content: t('i18n.about.location')
    },
    {
      imagePath: 'images/resume/about_me.png',
      hrefPath: '',
      content: t('i18n.about.name')
    },
    {
      imagePath: 'images/resume/experience.png',
      hrefPath: '',
      content: t('i18n.about.jobTitle')
    },
    {
      imagePath: 'images/resume/email.png',
      hrefPath: 'mailto:lyinjue456852@gmail.com',
      content: 'lyinjue456852@gmail.com'
    }
  ])
  const contactList = ref([
    {
      imagePath: 'images/resume/github.png',
      hrefPath: 'https://github.com/jaylee840831',
      content: 'Github'
    },
    {
      imagePath: 'images/resume/linkedin.png',
      hrefPath: 'https://www.linkedin.com/in/%E5%B0%B9%E8%A6%BA-%E6%9D%8E-32395b23a/',
      content: 'Linkedin'
    }
  ])
</script>

<style lang="scss" scoped>
  .about{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 100px;
    padding-bottom: 100px;

    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-line;
    word-break: break-word;
  }

  .blockContainer{
    width: 90%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }

  .welcomeContainer{
  }

  .welcomeItem{
    width: 50%;
  }

  .infoContainer{
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    .infoItem {
      display: flex;
      align-items: center;
      padding-top: 20px;

      img{
        width: 28px;
        height: 28px;
        margin-right: 5px;
      }
    }
  }

  .contactContainer{
    display: flex;
    flex-wrap: wrap;

    img{
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 5px;
    }
    img:hover{
      scale: (1.2);
    }
  }

  @media (max-width: 759px) {
    .about{
      text-align: center;
    }

    .welcomeContainer{
      flex-wrap: wrap-reverse;
    }

    .welcomeItem{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center !important;
    }

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