import { defineStore } from 'pinia';

export const useAllStore = defineStore('all', () => {
  const appWidth = ref(0)
  const appHeight = ref(0)
  const resumeScroll = ref('about')
  const darkMode = ref(false)

  const setResumeScroll = (str: string | '') => {
    resumeScroll.value = str
  }

  const setAppWidth = (num: number | 0) => {
    appWidth.value = num
  }

  const setAppHeight = (num: number | 0) => {
    appHeight.value = num
  }

  const setDarkMode = (bool: boolean) => {
    darkMode.value = bool
  }

  const currentAppWidth = computed(() => appWidth.value ? appWidth.value : 0)
  const currentAppHeight = computed(() => appHeight.value ? appHeight.value : 0)
  const chartTextColor = computed(() => darkMode.value ? '#ffffff' : '#7e84a3')
  const currentResumeScroll = computed(() => resumeScroll.value ? resumeScroll.value : '')

  return {
    appWidth,
    appHeight,
    resumeScroll,
    darkMode,
    setAppWidth,
    setAppHeight,
    setDarkMode,
    setResumeScroll,
    currentAppWidth,
    currentAppHeight,
    currentResumeScroll,
    chartTextColor
  }
})