<template>
  <div class="appHeader">
    <el-page-header :icon="null" class="headerContainer">
      <template #content>
        <div class="headerContent">
          <i class="bi bi-list drawerButton" @click="drawer = true"></i>
          <div class="animation-container">
            <div class="ball bounce">
              <img src="../../public/images/ball.png">
            </div>
            <div class="basket">
              <img src="../../public/images/basket.png">
            </div>
          </div>
          <!-- 平板、電腦版router menu -->
          <el-menu
            :default-active="currentActive"
            class="routerMenu"
            mode="horizontal"
          >
            <el-menu-item
              v-for="(r, index) in routerList" :key="index"
              :index="r.routerName"
              @click="router.push({ name: r.routerName })"
            >
              {{ r.title }}
            </el-menu-item>
          </el-menu>
        </div>
      </template>
      <template #extra>
        <div class="headerContent headerButton">
          <!-- 多國語系 -->
          <el-dropdown trigger="click" @command="handleLanguageCommand">
            <div class="dropdownTitle">
              <i class="bi bi-globe"
                style="margin-right: 10px;">
              </i>
              <span>
                {{ translateLanguage(currentLanguage) }}
              </span>
            </div>
            <template v-slot:dropdown>
              <div class="dropdownContent">
                <el-dropdown-item v-for="item in languageList" :key="item" :command="item.shortName">
                  <span :class="{'menuLinkActive': currentLanguage === item.shortName}">
                    {{ item.name }}
                  </span>
                </el-dropdown-item>
              </div>
            </template>
          </el-dropdown>
          <!-- 亮暗色主題切換 -->
          <el-switch
            v-model="isDark"
            inline-prompt
            style="margin-left: 20px"
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

    <!-- 行動裝置版router menu -->
    <el-drawer
      v-model="drawer"
      direction="ltr"
    >
      <el-menu :default-active="currentActive" style="height: 80vh;">
        <el-menu-item
          v-for="(r, index) in routerList" :key="index"
          :index="r.routerName"
          @click="router.push({ name: r.routerName })"
        >
          {{ r.title }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDark } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const currentActive = ref('Resume')
const drawer = ref(false)
const isDark = useDark(
  {
    selector: 'body',
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light'
    // disableTransition: false
  }
)
const languageList = ref([
  {shortName: 'en', name: t('i18n.language.en')},
  {shortName: 'tw', name: t('i18n.language.tw')}
])
const routerList = ref([
  {
    title: t('i18n.router.resume'),
    routerName: 'Resume'
  },
  {
    title: t('i18n.router.contact'),
    routerName: 'Contact'
  },
])

watch(() => router.currentRoute.value.name, (newValue) => {
  for(let i = 0; i < routerList.value.length; i++) {
    if (routerList.value[i].routerName === newValue) {
      currentActive.value = newValue
      break
    }
  }
}, { deep: true })

const currentLanguage = computed<string | ''>(() => {
  return sessionStorage.getItem('language')!
})

// 多國語系切換
function handleLanguageCommand (lang: string | '') {
  sessionStorage.setItem('language', lang)
  location.reload()
}

function translateLanguage (language: string | '') {
  switch (language) {
  case 'en':
    return 'EN'
  case 'tw':
    return '繁中'
  default:
    return ''
  }
}

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

<style lang="scss" scoped>
  .headerContainer{
    padding: 5px 20px;
    background-color: var(--secondaryDarkColor) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    i{
      font-size: 24px;
      color: black;
    }
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
    width: 130px;
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
    display: flex;
    max-width: 600px;
    min-width: 300px;
  }

  .drawerButton{
    display: none;
  }

  .el-menu {
    background-color: var(--secondaryDarkColor) !important;
    border: 1px transparent solid !important;
  }

  .el-menu .el-menu-item.is-active {
    color: black !important;
    border-bottom: 2px solid  var(--secondaryLightColor)  !important;
  }

  .el-menu .el-menu-item {
    background-color: transparent !important;
    color: black !important;
  }
  .el-menu .el-menu-item:hover {
    background-color: var(--secondaryLightColor) !important;
    border-radius: 5px;
  }

  .dropdownTitle{
    width: 70px;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    align-items: center;
    padding: 17px 10px;
    color: black;
    cursor: pointer;
  }

  .dropdownTitle:hover{
    background-color: var(--secondaryLightColor);
    border-radius: 5px;
  }

  .menuLinkActive{
    color: var(--secondaryDarkColor);
  }

  @keyframes shoot {
    0% {
      transform: translateX(100px) translateY(15px);
    }
    25% {
      transform: translateX(70px) translateY(-60px);
    }
    50% {
      transform: translateX(15px) translateY(15px);
    }
    75% {
      transform: translateX(15px) translateY(70px);
    }
    100% {
      transform: translateX(100px) translateY(15px);
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
      transform: translateX(90px) translateY(20px);
    }
    20% {
      transform: translateX(90px) translateY(0px); /* 上升的高度 */
    }
    50% {
      transform: translateX(90px) translateY(20px); /* 回到原始位置 */
    }
    70% {
      transform: translateX(90px) translateY(0px); /* 二次弹跳 */
    }
    100% {
      transform: translateX(90px) translateY(20px);
    }
  }

  @media (max-width: 760px) {
    .routerMenu {
      display: none;
    }

    .drawerButton{
      display: flex;
    }

    .animation-container{
      display: none;
    }
  }
</style>
