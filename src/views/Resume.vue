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
        <div style="width: 100%; display: flex; justify-content: flex-end;">
          <el-icon @click="isCollapse = !isCollapse" size="large">
            <DArrowLeft v-show="!isCollapse"/>
            <DArrowRight v-show="isCollapse"/>
          </el-icon>
        </div>
        <div style="width: 100%; display: flex; justify-content: center;">
          <el-avatar
            :size="headShotSize"
            src="images/user.png"
          />
        </div>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="resumeContainer">
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    DArrowLeft,
    DArrowRight
  } from '@element-plus/icons-vue'

  const isCollapse = ref(false)
  const headShotSize = ref(150)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  watch(() => isCollapse.value, (newValue) => {
    if (newValue) headShotSize.value = 36
    else headShotSize.value = 150
  }, { deep: true })
</script>

<style scoped>
  .resume{
    display: flex;
    flex-direction: row;
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
  .el-icon {
    cursor: pointer;
  }
</style>
