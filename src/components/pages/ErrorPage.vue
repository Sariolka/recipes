<script setup lang="ts"></script>

<template>
  <section class="not-found">
    <div class="not-found__box">
      <div class="not-found__container">
        <p class="not-found__error">404</p>
        <div class="not-found__content">
          <h1 class="not-found__title">Page not found</h1>
          <router-link class="not-found__link" to="/">To main</router-link>
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
}
</style>
