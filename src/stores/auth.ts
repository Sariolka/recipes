import { defineStore } from 'pinia';

interface AuthState {
  user: null | string;
  token: null | string;
  data: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      user: localStorage.getItem('user') || null,
      token: localStorage.getItem('token') || null,
      data: false
    };
  },
  actions: {
    setUser(user: string) {
      this.user = user;
      localStorage.setItem('user', user);
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setData() {
      this.data = true;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.data = false;
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: () => localStorage.getItem('user')
  }
});
