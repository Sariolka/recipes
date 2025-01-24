<script setup lang="ts">
import logo from '@/components/Icons/logo.svg';
import { useAuthStore } from '@/components/Stores/auth.ts';
import { computed } from 'vue';
const store = useAuthStore();
const user = computed(() => store.user);
const isAuthenticated = computed(() => store.token);
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo-container">
        <img class="header__logo" :src="logo" alt="Логотип" />
        <h1 class="header__title">Find a Recipe</h1>
      </div>
      <nav class="header__nav">
        <router-link to="/" class="header__link"> Main </router-link>
        <router-link to="/favourites" class="header__link" v-if="isAuthenticated">
          Favourites
        </router-link>
        <div class="header__auth">
          <button
            class="header__link header__btn-auth"
            v-if="!isAuthenticated"
            @click="$emit('openLoginModal')"
          >
            Login
          </button>
          <div class="header__user-block">
            <div class="header__user" v-if="isAuthenticated">{{ user }}</div>
            <button
              class="header__link header__btn-auth"
              v-if="isAuthenticated"
              @click="$emit('logout')"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </div>
    <div class="header__border"></div>
  </header>
</template>

<style scoped lang="scss">
.header {
  height: 91px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  cursor: default;

  &__logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__container {
    display: flex;
    align-items: center;
    padding-left: 125px;
    padding-right: 125px;
    margin-top: auto;
    margin-bottom: auto;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
      padding-left: 65px;
      padding-right: 65px;
    }
  }

  &__border {
    height: 2px;
    width: 100%;
    background-color: #fff;
    opacity: 0.1;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 50px;
  }

  &__logo {
    margin-bottom: 5px;
  }

  &__user-block {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    color: #34c759;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
  }

  &__link {
    display: inline-flex;
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }

  &__user {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;
    line-height: normal;
    color: #fff;
    margin-bottom: 3px;
  }
}
</style>
