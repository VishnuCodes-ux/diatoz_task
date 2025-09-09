import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    accessToken: localStorage.getItem('access_token') || null,
    authToken: null
  }),
  actions: {
    async login(email, password) {
      try {
        let res = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
          email: email,
          password: password
        });
        this.accessToken = res.data.access_token;
        // this.isAuthenticated = true
        localStorage.setItem('access_token', this.accessToken);
        localStorage.setItem('authToken', this.authToken);
        return { success: true };
      } catch (error) {
        const message = error.response?.data?.message || "Login failed!";
        return { success: false, message };
      }
    },
    logout() {
      // this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('access_token');
      localStorage.removeItem('authToken');
    }
  }
})
