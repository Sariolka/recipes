<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  isLoading: boolean;
}>();

const email = ref('');
const password = ref('');
</script>

<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card modal__card">
      <header class="modal-card-head modal__head">
        <p class="modal-card-title">Access Your Account</p>
        <button class="delete modal__close" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form class="modal__form" @submit.prevent="$emit('submit', email, password)" id="login">
          <div>
            <label for="email">Email</label>
            <input class="input modal__input" v-model="email" type="email" id="email" />
          </div>

          <div>
            <label for="password">Password</label>
            <input
              v-model="password"
              class="input modal__input"
              type="password"
              id="password"
              minlength="6"
            />
          </div>
        </form>
      </section>
      <footer class="modal-card-foot modal__foot">
        <p>
          Don't have an account?
          <button class="button is-white modal__link" @click="$emit('openRegisterModal')">
            Register
          </button>
        </p>
        <button
          class="button is-dark modal__button"
          type="submit"
          form="login"
          :class="{ 'is-loading': isLoading }"
        >
          Submit
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  width: 100vw;

  &__card {
    width: 480px;
  }

  &__head {
    box-shadow: none;
  }

  &__foot {
    background-color: #fff;
  }

  &__close {
    background-image: url('../Icons/close.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 24px;
    height: 24px;
  }

  &__input {
    outline: transparent;
    margin-bottom: 5px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__foot {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__button {
    width: 150px;
  }

  &__link {
    padding: 0;
    &:hover {
      background-color: transparent;
    }
  }
}

.modal-card-body {
  padding-left: 32px;
  padding-right: 14px;
}
</style>
