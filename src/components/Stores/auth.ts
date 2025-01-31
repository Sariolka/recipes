import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    setUser(user) {
      this.user = user;
      // @ts-expect-error @typescript-eslint/ban-ts-comment
    }, setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
});
