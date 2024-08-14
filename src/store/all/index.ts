import { defineStore } from 'pinia';

export const useAllStore = defineStore('all', {
  state: () => ({
    appWidth: 0,
    appHeight: 0
  }),
  actions: {
    setAppWidth(num: number | 0) {
      this.appWidth = num
    },
    setAppHeight(num: number | 0) {
      this.appHeight = num
    }
  },
  getters: {
    currentAppWidth: (state) => state.appWidth ? state.appWidth : 0,
    currentAppHeight: (state) => state.appHeight ? state.appHeight : 0
  }
});