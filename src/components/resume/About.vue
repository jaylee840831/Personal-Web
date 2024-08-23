<template>
  <div class="about">
    <div class="welcomeContainer">
      <h1 class="welcomeTitle">
        {{ t('i18n.about.welcomeTitle') }}
      </h1>
      <el-avatar
        :size="200"
        src="public/images/user.png"
      />
    </div>
    <div class="contactContainer">
      <div
        class="contactItem"
        v-for="(r, index) in contactList"
        :key="index"
        :index="index"
      >
        <img :src="r.imagePath">
        <a
          v-if="r.hrefPath !== ''"
          :href="r.hrefPath"
          target="_blank"
        >
          {{ r.content }}
        </a>
        <span v-else>
          {{ r.content }}
        </span>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const contactList = ref([
  {
    imagePath: 'images/resume/location.png',
    hrefPath: '',
    content: t('i18n.about.location')
  },
  {
    imagePath: 'images/resume/github.png',
    hrefPath: 'https://github.com/jaylee840831',
    content: t('i18n.about.github')
  },
  {
    imagePath: 'images/resume/email.png',
    hrefPath: 'mailto:lyinjue456852@gmail.com',
    content: 'lyinjue456852@gmail.com'
  }
])
</script>

<style lang="scss" scoped>
  .about{
  }

  .welcomeContainer{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20px;
  }

  .welcomeTitle{
    width: 50%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  .contactContainer{
    display: grid;
    justify-content: center;
    padding-top: 20px;
  }

  .contactItem {
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 759px) {
    .welcomeContainer{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap-reverse;
      padding-top: 20px;
    }

    .welcomeTitle{
      width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .contactContainer {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (min-width: 760px) and (max-width: 1279px) {
    .contactContainer {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1280px) {
    .contactContainer {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>