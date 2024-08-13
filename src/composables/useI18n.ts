import { createI18n } from 'vue-i18n'
import en from '@/plugins/vue-18n-config/en.json'
import tw from '@/plugins/vue-18n-config/tw.json'

let currentLocale = ''
const lang = sessionStorage.getItem('language')

if (lang) {
  switch (lang) {
  case 'en':
    currentLocale = lang
    break
  case 'tw':
    currentLocale = lang
    break
  default:
    currentLocale = ''
    break
  }
} else {
  currentLocale = 'tw'
}

sessionStorage.setItem('language', currentLocale)

const i18n = createI18n({
  legacy: false, // 讓setup函數可以通過t訪問
  globalInjection: true, // 讓template可以像vue2一樣使用$t訪問
  locale: currentLocale,
  messages: { en, tw }
})

export default i18n
