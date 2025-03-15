<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import HeaderComponent from '@/components/HeaderComponent.vue';
import videoWebm from '@/video/video-webm.webm';
import video from '@/video/video.mp4';
import ModalRegister from '@/components/ModalRegister.vue';
import ModalLogin from '@/components/ModalLogin.vue';
import ModalSuccess from '@/components/ModalWarning.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const store = useAuthStore();
const route = useRoute();
const router = useRouter();
const isRegisterModalOpen = ref(false);
const isLoginModalOpen = ref(false);
const isWarningModalOpen = ref(false);
const warningText = ref('');
const hasData = computed(() => {
  return store.data;
});

//Модалки
const handleOpenRegisterModal = () => {
  isLoginModalOpen.value = false;
  isRegisterModalOpen.value = true;
};

const closeRegisterModal = () => {
  isRegisterModalOpen.value = false;
};

const handleOpenLoginModal = () => {
  isLoginModalOpen.value = true;
};

const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};

const handleOpenWarningModal = (text: string) => {
  isWarningModalOpen.value = true;
  warningText.value = text;
  setTimeout(() => {
    closeWarningModal();
  }, 3000);
};

const closeWarningModal = () => {
  isWarningModalOpen.value = false;
};

const handleLogout = () => {
  store.logout();
};

watch(
  () => store.user,
  (newValue) => {
    if (!newValue && route.path === '/favourites') {
      router.push('/');
    }
  }
);

onMounted(async () => {
  if (store.token) {
    store.setToken(store.token);
    store.setUser(store.user);
  }
});
</script>

<template>
  <section class="page" :class="{ 'page_type-favourite': route.path !== '/' }">
    <video
      autoPlay
      playsInline
      muted
      loop
      class="page__video"
      v-if="route.path === '/' && hasData === false"
    >
      <source :src="videoWebm" type="video/webm" />
      <source :src="video" type="video/mp4" />
      Ваш браузер не поддерживает встроенные видео
    </video>
    <HeaderComponent
      :hasData="hasData"
      v-if="route.path !== '/404'"
      @openLoginModal="handleOpenLoginModal"
      @logout="handleLogout"
    />
    <router-view @open-modal="handleOpenWarningModal" />
    <FooterComponent :hasData="hasData" />
    <ModalRegister
      :is-open="isRegisterModalOpen"
      @close="closeRegisterModal"
      @open-modal="handleOpenWarningModal"
    />
    <ModalLogin
      :is-open="isLoginModalOpen"
      @close="closeLoginModal"
      @open-modal="handleOpenWarningModal"
      @openRegisterModal="handleOpenRegisterModal"
    />
    <ModalSuccess :is-open="isWarningModalOpen" @close="closeWarningModal" :text="warningText" />
  </section>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &_type-favourite {
    background-color: #fff;
    min-height: 100vh;
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
