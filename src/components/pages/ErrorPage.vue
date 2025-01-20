<script setup lang="ts"></script>

<template>
  <section class="not-found">
    <div class="not-found__box">
      <div class="not-found__container">
        <p class="not-found__error">404</p>
        <div class="not-found__content">
          <h1 class="not-found__title">Page not found</h1>
          <router-link class="not-found__link" to="/">Main page</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__error {
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-size: 20px;
    line-height: 20px;
    color: #d9d9d9;
    font-weight: 400;
  }

  &__title {
    font-size: 28px;
    line-height: 28px;
    color: #d9d9d9;
    font-weight: 400;
    margin-top: 40px;
    margin-bottom: 10px;
  }

  &__link {
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
    border-radius: 40px;
    color: #d9d9d9;
    white-space: nowrap;
    text-underline-offset: 4.5px;
  }
}
</style>
