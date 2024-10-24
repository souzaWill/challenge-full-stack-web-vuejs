import { defineStore } from 'pinia';
import { authService } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || null,
    error: null,
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
    async login(email, password) {
      try {
        const { data } = await authService.login(email, password);
        this.setAuth(data.token, data.name);

        this.error = null;
      } catch (err) {
        //TODO: melhorar isso aqui
        this.error = err.response?.data?.message || 'Erro ao fazer login';
      }
    },
    async logout() {
      try {
        await authService.logout();
        this.clearAuth();

        this.error = null;
      } catch (err) {
        alert(err);
        //TODO: melhorar isso aqui
        this.error = err.response?.data?.message || 'Erro ao fazer logout';
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserName: (state) => state.userName,
  },
});
