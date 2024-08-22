<template>
  <div class="resume">
    <div class="resumeGuideBar">
      <el-menu
        default-active="about"
        class="guideMenu"
        mode="vertical"
        :collapse="isCollapse"
      >
        <!-- 收合menu -->
        <div class="collapseButtonContainer">
          <i :class="arrowIcon" @click="isCollapse = !isCollapse"></i>
        </div>
        <!-- 大頭照 -->
        <!-- <div style="width: 100%; display: flex; justify-content: center;">
          <el-avatar
            :size="headShotSize"
            src="images/user.png"
          />
        </div> -->
        <el-menu-item
          v-for="(r, index) in resumeGuideList"
          :key="index"
          :index="r.name"
          :class="r.name"
          @click="currentSelect = r.name"
        >
          <img :src="r.imagePath"/>
          <template #title>
            {{ r.title }}
          </template>
        </el-menu-item>
        <el-sub-menu index="empty" style="visibility: hidden;">
          <template #title>
            <img src="../../public/images/resume/about_me.png"/>
            <span>empty</span>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <ResumeContent
      :currentSelect="currentSelect"
      :resumeGuideList="resumeGuideList"
      @scrollTarget="handleScrollTarget"
    />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import ResumeContent from '@/components/resume/ResumeContent.vue'

  const { t } = useI18n()
  const isCollapse = ref(false)
  const arrowIcon = ref('bi bi-chevron-double-left')
  const currentSelect = ref('about')
  // const headShotSize = ref(150)

  const resumeGuideList = ref([
    {
      name: 'about',
      title: t('i18n.resume.about'),
      imagePath: 'images/resume/about_me.png'
    },
    {
      name: 'education',
      title: t('i18n.resume.education'),
      imagePath: 'images/resume/education.png'
    },
    {
      name: 'skill',
      title: t('i18n.resume.skills'),
      imagePath: 'images/resume/skill.png'
    },
    {
      name: 'experience',
      title: t('i18n.resume.experience'),
      imagePath: 'images/resume/experience.png'
    },
    {
      name: 'portfolio',
      title: t('i18n.resume.portfolio'),
      imagePath: 'images/resume/portfolio.png'
    },
    {
      name: 'achievement',
      title: t('i18n.resume.achievements'),
      imagePath: 'images/resume/achievement.png'
    },
    {
      name: 'hobbit',
      title: t('i18n.resume.hobbits'),
      imagePath: 'images/resume/hobbit.png'
    }
  ])

  function activeMenuItem(target: string | '') {
    const guideMenu = document.getElementsByClassName('guideMenu')[0]
    const firstLevelItems = guideMenu.querySelectorAll(':scope > .el-menu-item')

    firstLevelItems.forEach(item => {
      if(item.classList.contains(target)) {
        item.classList.add('isActiveMenuItem')
      }
      else {
        item.classList.remove('is-active')
        item.classList.remove('isActiveMenuItem')
      }
    })
  }

  function handleScrollTarget(target: string | '') {
    // console.log('Currently in view:', target)
    currentSelect.value = ''
    activeMenuItem(target)
  }

  watch(() => isCollapse.value, (newValue: boolean) => {
    if (newValue) {
      arrowIcon.value = 'bi bi-chevron-double-right'
      // headShotSize.value = 36
    }
    else {
      arrowIcon.value = 'bi bi-chevron-double-left'
      // headShotSize.value = 150
    }
  }, { deep: true })
</script>

<style scoped>
  .resume{
    display: flex;

    i{
      cursor: pointer;
    }
    img{
      width: 24px;
      margin-right: 10px;
    }
  }

  .resumeGuideBar{
  }

  .isActiveMenuItem{
    color: var(--secondaryDarkColor);
    background: #ecf5ff !important;
  }

  .isActiveMenuItem:hover{
    color: var(--secondaryDarkColor);
    background: #ecf5ff !important;
  }

  .collapseButtonContainer{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    margin-bottom: 10px;
  }

  .guideMenu {
    width: 100%;
    height: 100vh;
  }
</style>
