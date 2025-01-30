<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  isLoading: boolean;
}>();

const userName = ref('');
const email = ref('');
const password = ref('');
</script>

<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card modal__card">
      <header class="modal-card-head modal__head">
        <p class="modal-card-title">Create an account</p>
        <button class="delete modal__close" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form
          novalidate
          class="modal__form"
          @submit.prevent="$emit('submit', userName, email, password)"
          id="register"
        >
          <div>
            <label for="name">Name</label>
            <input class="input modal__input" v-model="userName" type="text" id="name" />
          </div>
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
        <button
          class="button is-dark modal__button"
          type="submit"
          form="register"
          :class="{ 'is-loading': isLoading }"
        >
          Save
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

  &__button {
    width: 150px;
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
    justify-content: end;
  }
}

.modal-card-body {
  padding-left: 32px;
  padding-right: 14px;
}
</style>
