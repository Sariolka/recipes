<script setup lang="ts">
import logo from '../icons/logo.svg'
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo-container">
        <img class="header__logo" :src="logo" alt="Логотип" />
        <h1 class="header__title">Find a Recipe</h1>
      </div>
      <nav class="header__nav">
        <router-link to="/main" class="header__link"> Main </router-link>
        <router-link to="/favourites" class="header__link"> Favourites </router-link>
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

  &__logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__container {
    display: flex;
    align-items: center;
    padding-left: 165px;
    padding-right: 165px;
    margin-top: auto;
    margin-bottom: auto;
    justify-content: space-between;
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

  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    color: #34c759;
    margin-top: 0;
    margin-bottom: 0;
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
}
</style>
