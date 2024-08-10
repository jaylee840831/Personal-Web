<template>
  <div class="appHeader">
    <el-page-header :icon="null" class="headerContainer">
      <template #content>
        <div class="flex items-center">
          <!-- <el-avatar
            :size="32"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          /> -->
          <span class="text-large font-600 mr-3"> Title </span>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button>Print</el-button>
          <el-button type="primary" class="ml-2">Edit</el-button>
        </div>
      </template>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .headerContainer{
    padding: 5px 20px;
    background-color: #37D0EE;
  }
  :deep .el-page-header__back {
    display: none; /* 隱藏返回按鈕 */
  }
  :deep .el-divider{
    display: none;
  }
</style>
