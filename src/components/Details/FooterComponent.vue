<script setup lang="ts">
import { useRoute } from 'vue-router';

const computerYear = new Date().getFullYear();

const route = useRoute();
</script>

<template>
  <footer class="footer" :class="{ 'footer_type-main': route.path === '/' }">
    <a href="https://t.me/Sariolka" class="footer__link footer__link_type-tg"></a>
    <a href="https://github.com/Sariolka" class="footer__link footer__link_type-gh"></a>
    <div class="footer__auth">Copyright © {{ computerYear }}</div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 20px 138px;
  background-color: #233000;
  gap: 15px;

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

  &__link {
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    &_type-tg {
      background-image: url('@/components/Icons/telegram.svg');
    }
    &_type-gh {
      background-image: url('@/components/Icons/github.svg');
    }
  }
}
</style>
