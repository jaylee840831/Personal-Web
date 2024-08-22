<template>
  <div class="resumeDetail">
    <div class="header">
      <!-- <h1>{{ t('i18n.about.welcomTitle') }}</h1> -->
      <h1>歡迎來到我的網站aijfoiejfoiasjefoasjfoisajfosjaioejfosfj</h1>
      <el-avatar
        :size="150"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <div class="body">
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.resumeDetail{
  display: flex;
  justify-content: center;
  padding: 20px;
}

.header{
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  h1{
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
}
</style>