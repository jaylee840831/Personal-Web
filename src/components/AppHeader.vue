<template>
  <div class="appHeader">
    <el-page-header :icon="null" class="headerContainer">
      <template #content>
        <div class="headerContent">
          <div class="animation-container">
            <div class="ball bounce">
              <img src="../../public/images/ball.png">
            </div>
            <div class="basket">
              <img src="../../public/images/basket.png">
            </div>
          </div>
          <el-menu default-active="0" class="routerMenu" mode="horizontal">
            <el-menu-item
              v-for="(r, index) in routerList" :key="index"
              :index="index.toString()"
              @click="router.push({ name: r.pathName })"
            >
              {{ r.name }}
            </el-menu-item>
          </el-menu>
        </div>
      </template>
      <template #extra>
        <div class="headerContent headerButton">
          <i
            class="bi bi-globe"
            style="font-size: 24px; cursor: pointer; margin-right: 20px;">
          </i>
          <el-switch
            v-model="isDark"
            inline-prompt
          >
            <template #active-action>
              <i class="bi bi-moon-fill" style="color:#313339"></i>
            </template>
            <template #inactive-action>
              <i class="bi bi-sun-fill" style="color:#313339"></i>
            </template>
          </el-switch>
        </div>
      </template>
    </el-page-header>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const isDark = ref(false)
const routerList = ref([
  {
    name: t('i18n.router.about'),
    pathName: 'Resume'
  },
  {
    name: t('i18n.router.contact'),
    pathName: 'Contact'
  },
])

function handleClick (event: MouseEvent) {
  const buttons = document.getElementsByClassName('headerButton') as HTMLCollectionOf<HTMLDivElement>
  const ball = document.querySelector('.ball') as HTMLElement
  let clickTarget = false

  for(let i = 0; i < Array.from(buttons).length; i++) {
    const element = Array.from(buttons)[i]
    if (element.contains(event.target as Node)) {
      clickTarget = true
      break
    }
  }

  // console.log(clickTarget)

  if (clickTarget) {
    ball.classList.add('shoot')
    ball.classList.remove('bounce')
  } else {
    ball.classList.remove('shoot')
    ball.classList.add('bounce')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<style scoped>
  .headerContainer{
    padding: 5px 20px;
    background-color: #F57C00;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  :deep .el-page-header__back {
    display: none; /* 隱藏返回按鈕 */
  }
  :deep .el-divider{
    display: none;
  }

  .headerContent {
    display: flex;
    align-items: center;
  }

  .animation-container {
    width: 200px;
    height: 60px;
    margin-right: 30px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ball img{
    animation: roll 2s linear infinite;
  }

  .ball{
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0px;
    display: flex;
    animation: shoot 6s ease-in-out forwards;
  }

  .shoot{
    animation: shoot 6s ease-in-out infinite;
  }

  .bounce{
    animation: bounce 6s linear infinite;
  }

  .basket{
    width: 100px;
    position: absolute;
    left: 0px;
    top: 2px;
  }

  .routerMenu {
    min-width: 300px !important;
    max-width: 600px !important;
    background-color: #F57C00;
    border-bottom: 1px solid #F57C00 !important;
  }

  .routerMenu .el-menu-item.is-active {
    color: black !important;
    border-bottom: 2px solid  #F9AE66  !important;
  }

  .routerMenu .el-menu-item {
    background-color: transparent !important;
    color: black !important;
  }
  .routerMenu .el-menu-item:hover {
    background-color: #F9AE66 !important;
    color: black !important;
    border-radius: 5px;
  }

  @keyframes shoot {
    0% {
      transform: translateX(170px) translateY(15px);
    }
    25% {
      transform: translateX(100px) translateY(-60px);
    }
    50% {
      transform: translateX(15px) translateY(15px);
    }
    75% {
      transform: translateX(15px) translateY(100px);
    }
    100% {
      transform: translateX(170px) translateY(15px);
    }
  }

  @keyframes roll {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    0% {
      transform: translateX(170px) translateY(20px);
    }
    20% {
      transform: translateX(170px) translateY(0px); /* 上升的高度 */
    }
    50% {
      transform: translateX(170px) translateY(20px); /* 回到原始位置 */
    }
    70% {
      transform: translateX(170px) translateY(0px); /* 二次弹跳 */
    }
    100% {
      transform: translateX(170px) translateY(20px);
    }
  }
</style>
