import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(username, password) {
      if (username === 'admin' && password === '123456') {
        this.isAuthenticated = true
        this.user = { username }
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
    }
  }
})
