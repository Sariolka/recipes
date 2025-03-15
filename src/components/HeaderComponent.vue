<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth.ts';
import router from '@/router/router.ts';
import { useRoute } from 'vue-router';
import logo from '@/icons/Subtract.png';

const props = defineProps<{
  hasData: boolean;
}>();

const store = useAuthStore();
const isAuthenticated = computed(() => store.isAuthenticated);
const route = useRoute();
const user = store.getUser();

const handlePushToMain = () => {
  if (route.path !== '') {
    router.push('/');
  }
};
</script>

<template>
  <header class="header" :class="{ 'header_type-background': hasData || route.path !== '/' }">
    <div class="header__container">
      <div class="header__left">
        <div class="header__icon"></div>
        <div class="header__logo-container" @click="handlePushToMain">
          <img class="header__logo" :src="logo" alt="Логотип" />
          <h1 class="header__title">Find a Recipe</h1>
        </div>
      </div>

      <nav class="header__nav">
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

  &_type-background {
    background-color: #233000;
  }

  &__logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    cursor: pointer;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__container {
    display: flex;
    align-items: center;
    padding-left: 70px;
    padding-right: 100px;
    margin-top: auto;
    margin-bottom: auto;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
      padding-left: 30px;
      padding-right: 30px;
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
    position: absolute;
    width: 140px;
    height: 60px;
    bottom: -14px;
    left: 19px;
  }

  &__user-block {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__title {
    font-family: 'Rufina', sans-serif;
    font-size: 28px;
    font-weight: 700;
    line-height: normal;
    color: #ebf0e4;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
  }

  &__link {
    font-family: 'Rufina', sans-serif;
    display: inline-flex;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    text-decoration: none;
    color: #ebf0e4;
    cursor: pointer;
  }

  &__user {
    font-family: 'Rufina', sans-serif;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    color: #ebf0e4;
  }

  &__icon {
    background-image: url('@/icons/carrot.svg');
    background-size: cover;
    background-position: center;
    width: 70px;
    aspect-ratio: 342/300;
    background-repeat: no-repeat;
  }
}
</style>
