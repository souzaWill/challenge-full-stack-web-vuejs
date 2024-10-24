import { defineStore } from 'pinia';
import { authService } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || null,
    errors: [],
    error: '',
    hasError: false,
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
    setErrors(response) {
      this.hasError = true;

      if (response.status === 422) {
        this.errors = response.data.errors;
      } else {
        this.error = response?.data?.message;
      }
    },
    async login(email, password) {
      try {
        const { data } = await authService.login(email, password);
        this.setAuth(data.token, data.name);

        this.errors = [];
      } catch (error) {
        this.setErrors(error.response);
      }
    },
    async logout() {
      try {
        await authService.logout();
        this.clearAuth();

        this.error = null;
      } catch (error) {
        this.setErrors(error.response);
      }
    },
  },
});
