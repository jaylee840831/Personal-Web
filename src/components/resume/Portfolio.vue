<template>
  <div class="portfolio">
    <div class="blockContainer">
      <h1>{{ t('i18n.portfolio.title') }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<style lang="scss" scoped>
  .portfolio{
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
  }
</style>