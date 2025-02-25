import { defineStore } from 'pinia';

interface AuthState {
  user: null | string;
  token: null | string;
  data: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      user: user,
      token: token,
      data: false
    };
  },
  actions: {
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', user);
    },
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    setToken(token) {
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

    getUser: (state) => () => {
      return state.user;
    }
  }
});
