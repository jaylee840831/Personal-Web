<template>
  <div class="resumeDetail">
    <div class="header detailContainer">
      <!-- <h1>{{ t('i18n.about.welcomTitle') }}</h1> -->
      <h1>歡迎來到我的網站, aijfoiejfoiasjefoasjfoisajfosjaioejfosfj</h1>
      <el-avatar
        :size="150"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <div class="body detailContainer">
    </div>
    <div class="footer detailContainer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.resumeDetail{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.detailContainer{
  display: flex;
  flex-wrap: wrap;
  border: 1px red solid;
}
</style>