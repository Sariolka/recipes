<script lang="ts" setup>
import { useRoute } from 'vue-router';
import HeaderComponent from '@/components/details/HeaderComponent.vue';
import videoWebm from '@/components/video/video-webm.webm';
import video from '@/components/video/video.mp4';

const route = useRoute();
</script>

<template>
  <section class="page">
    <video autoPlay playsInline muted loop class="page__video">
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
  //background-color: #1A1A1A;

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
