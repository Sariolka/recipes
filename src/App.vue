<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import HeaderComponent from '@/components/Details/HeaderComponent.vue';
import videoWebm from '@/components/Video/video-webm.webm';
import video from '@/components/Video/video.mp4';
import ModalRegister from '@/components/Details/ModalRegister.vue';
import { register, signin } from '@/api/api.ts';
import { ref, watch } from 'vue';
import { useAuthStore } from '@/components/Stores/auth.ts';
import ModalLogin from '@/components/Details/ModalLogin.vue';

const store = useAuthStore();
const route = useRoute();
const isLoading = ref(false);
const router = useRouter();
const isRegisterModalOpen = ref(false);
const isLoginModalOpen = ref(false);

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

const handleLogout = () => {
  store.setToken(null);
  store.setUser(null);
};

watch(
  () => store.user,
  (newValue) => {
    if (!newValue && route.path === '/favourites') {
      router.push('/');
    }
  }
);

const handleRegister = async (name: string, email: string, password: string) => {
  if (isLoading.value) {
    return;
  }
  if (!name || !email || !password) {
    return;
  }
  isLoading.value = true;
  try {
    const newData = {
      name: name,
      email: email,
      password: password
    };
    await register(newData);
    await handleSignin(email, password);
  } catch (err: any) {
    console.log(err);
  } finally {
    closeRegisterModal();
    isLoading.value = false;
  }
};

const handleSignin = async (email: string, password: string) => {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  try {
    const user = {
      email: email,
      password: password
    };
    const resSignin = await signin(user);
    store.setUser(resSignin.user.name);
    store.setToken(resSignin.accessToken);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    closeLoginModal();
  }
};
</script>

<template>
  <section class="page" :class="{ 'page_type-favourite': route.path !== '/' }">
    <video autoPlay playsInline muted loop class="page__video" v-if="route.path === '/'">
      <source :src="videoWebm" type="video/webm" />
      <source :src="video" type="video/mp4" />
      Ваш браузер не поддерживает встроенные видео
    </video>
    <HeaderComponent
      v-if="route.path !== '/404'"
      @openLoginModal="handleOpenLoginModal"
      @logout="handleLogout"
    />
    <router-view />
    <ModalRegister
      :is-loading="isLoading"
      :is-open="isRegisterModalOpen"
      @close="closeRegisterModal"
      @submit="handleRegister"
    />
    <ModalLogin
      :is-loading="isLoading"
      :is-open="isLoginModalOpen"
      @close="closeLoginModal"
      @submit="handleSignin"
      @openRegisterModal="handleOpenRegisterModal"
    />
  </section>
</template>

<style lang="scss" scoped>
.page {
  &_type-favourite {
    background-color: #1a1a1a;
    min-height: 100vh;
    padding-bottom: 50px;
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
