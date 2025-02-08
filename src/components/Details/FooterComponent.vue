<script setup lang="ts">
import { useRoute } from 'vue-router';

const computerYear = new Date().getFullYear();

const route = useRoute();
</script>

<template>
  <footer class="footer" :class="{ 'footer_type-main': route.path === '/' }">
    <div class="footer__auth">Copyright © {{ computerYear }}</div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 138px;
  background-color: #233000;

  &_type-main {
    background-color: transparent;
  }

  &__auth {
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.02em;
    color: #fff;
  }
}
</style>
