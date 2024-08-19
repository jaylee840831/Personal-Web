<template>
  <div class="appHeader">
    <div class="headerContainer">
      <div class="headerContent">
        <i class="bi bi-list drawerButton" @click="drawer = true"></i>
        <div class="logoContainer">
          <DashboardChart
            :chartOptions="{
              value: speed
            }"
            style="width: 100%; height: 100%;"
          />
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
      <div class="mPowerContainer">
        <div class="stripe mPowerBlue"></div>
        <div class="stripe mPowerDarkBlue"></div>
        <div class="stripe mPowerRed"></div>
      </div>
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
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in languageList" :key="item" :command="item.shortName">
                <span :class="{'menuLinkActive': currentLanguage === item.shortName}">
                  {{ item.name }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
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
    </div>

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
import DashboardChart from './chart/DashboardChart.vue'

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
const speed = ref<number>(0)

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
    speed.value = 180
  } else {
    speed.value = 0
  }
}

onMounted(() => {
  setTimeout(() => {
    speed.value = 180
  }, 1000)
  setTimeout(() => {
    speed.value = 0
  }, 3000)

  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<style lang="scss" scoped>
  .headerContainer{
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    background-color: var(--secondaryDarkColor) !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    i{
      font-size: 24px;
      color: white;
    }
    span{
      color: white;
    }
  }

  .headerContent {
    display: flex;
    align-items: center;
  }

  .logoContainer {
    width: 150px;
    height: 80px;
    margin-right: 30px;
    overflow: hidden;
  }

  .mPowerContainer{
    position: absolute;
    top: 0px;
    right: 20%;
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    animation: slideIn 2s forwards;

    .stripe {
      width: 70px;
      transform: skewX(-45deg); // x軸傾斜
    }

    .mPowerBlue {
      background-color: #6eb8ff;
    }

    .mPowerDarkBlue {
      background-color: #0033A0;
    }

    .mPowerRed {
      background-color: #ff0000;
    }
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
    background-color: transparent !important;
    border: 1px transparent solid !important;
  }

  .el-menu .el-menu-item.is-active {
    color: white !important;
    border-bottom: 3px solid  var(--highlightBottomColor)  !important;
  }

  .el-menu .el-menu-item {
    background-color: transparent !important;
    color: white !important;
    margin-left: 5px;
    margin-right: 5px;
  }

  .el-menu .el-menu-item:hover {
    border-bottom: 3px solid  var(--highlightBottomColor)  !important;
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

  .menuLinkActive{
    color: var(--secondaryDarkColor);
  }

  @keyframes roll {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 760px) {
    .routerMenu {
      display: none;
    }

    .drawerButton{
      display: flex;
    }

    .logoContainer{
      display: none;
    }
  }

  @media (max-width: 1280px) {
    .mPowerContainer{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 300px;
      height: 100%;
      display: flex;
      justify-content: center;
      overflow: hidden;
      animation: slideIn 2s forwards;

      .stripe {
        width: 70px;
        transform: skewX(-45deg); // x軸傾斜
      }

      .mPowerBlue {
        background-color: #6eb8ff;
      }

      .mPowerDarkBlue {
        background-color: #0033A0;
      }

      .mPowerRed {
        background-color: #ff0000;
      }
    }
  }
</style>
