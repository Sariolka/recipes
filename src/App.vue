<script lang="ts" setup>
import { useRoute } from 'vue-router';
import HeaderComponent from '@/components/Details/HeaderComponent.vue';
import videoWebm from '@/components/Video/video-webm.webm';
import video from '@/components/Video/video.mp4';

const route = useRoute();
</script>

<template>
  <section class="page" :class="{ 'page_type-favourite': route.path !== '/' }">
    <video autoPlay playsInline muted loop class="page__video" v-if="route.path === '/'">
      <source :src="videoWebm" type="video/webm" />
      <source :src="video" type="video/mp4" />
      Ваш браузер не поддерживает встроенные видео
    </video>
    <HeaderComponent v-if="route.path !== '/404'" />
    <router-view />
  </section>
</template>

<style lang="scss" scoped>
.page {
  &_type-favourite {
    background-color: #1a1a1a;
    min-height: 100vh;
    padding-bottom: 50px;
    padding-left: 20px;
    padding-right: 20px;
  }

  &__video {
    height: 100vh;
    left: 0;
    object-fit: cover;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: -1;
  }
}
</style>
