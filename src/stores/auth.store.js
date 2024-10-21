import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,  
    userName: localStorage.getItem('userName') || null,  
  }),
  actions: {
    setAuth(token, userName) {
      this.token = token;
      this.userName = userName;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
    },

    clearAuth() {
      this.token = null;
      this.userName = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserName: (state) => state.userName, 
  },
})
