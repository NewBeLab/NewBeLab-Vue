// piniaを利用して、認証情報を管理する
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(token, user) {
      this.token = token
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
    },
  },
})
