import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    index: 100
  }),
  getters: {
    doubleIndex: (state) => {
      return state.index * 2
    }
  },
  actions: {
    increment() {
      this.index++
    }
  }
})
