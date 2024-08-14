<template>
  <div class="resume">
    <div class="resumeGuideBar">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- 收合menu -->
        <div style="width: 100%; display: flex; justify-content: flex-end;">
          <i :class="arrowIcon" @click="isCollapse = !isCollapse"></i>
        </div>
        <!-- 大頭照 -->
        <div style="width: 100%; display: flex; justify-content: center;">
          <el-avatar
            :size="headShotSize"
            src="images/user.png"
          />
        </div>
        <el-menu-item index="1">
          <img src="../../public/images/resume/about_me.png"/>
          <template #title>
            {{ t('i18n.resume.about') }}
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <img src="../../public/images/resume/education.png"/>
          <template #title>
            {{ t('i18n.resume.education') }}
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <img src="../../public/images/resume/skill.png"/>
          <template #title>
            {{ t('i18n.resume.skills') }}
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <img src="../../public/images/resume/experience.png"/>
          <template #title>
            {{ t('i18n.resume.experience') }}
          </template>
        </el-menu-item>
        <el-menu-item index="5">
          <img src="../../public/images/resume/portfolio.png"/>
          <template #title>
            {{ t('i18n.resume.portfolio') }}
          </template>
        </el-menu-item>
        <el-menu-item index="6">
          <img src="../../public/images/resume/achievement.png"/>
          <template #title>
            {{ t('i18n.resume.achievements') }}
          </template>
        </el-menu-item>
        <el-menu-item index="7">
          <img src="../../public/images/resume/hobbit.png"/>
          <template #title>
            {{ t('i18n.resume.hobbits') }}
          </template>
        </el-menu-item>
        <el-sub-menu index="8" style="visibility: hidden;">
          <template #title>
            <el-icon><location /></el-icon>
            <span>empty</span>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="resumeContainer">
      <ResumeContent/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import ResumeContent from '@/components/ResumeContent.vue';

  const { t } = useI18n()
  const isCollapse = ref(false)
  const headShotSize = ref(150)
  const arrowIcon = ref('bi bi-chevron-double-left')
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  watch(() => isCollapse.value, (newValue: boolean) => {
    if (newValue) {
      headShotSize.value = 36
      arrowIcon.value = 'bi bi-chevron-double-right'
    }
    else {
      headShotSize.value = 150
      arrowIcon.value = 'bi bi-chevron-double-left'
    }
  }, { deep: true })
</script>

<style scoped>
  .resume{
    display: flex;
    flex-direction: row;

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
  .resumeContainer{
    width: 100%;
    overflow-y: auto;
  }
  .el-menu-vertical-demo {
    height: 100vh;
  }
</style>
