<script setup lang="ts">
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const props = defineProps<{
  isOpen: boolean;
  isLoading: boolean;
}>();

const email = ref('');
const password = ref('');

const fieldSchemaEmail = toTypedSchema(
  zod.string().nonempty('Field is required').email('Must be a valid email')
);
const fieldSchemaPassword = toTypedSchema(
  zod.string().min(1, { message: 'This is required' }).min(8, { message: 'Too short' })
);
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
        <Form
          class="modal__form"
          @submit.prevent="$emit('submit', email, password)"
          id="login"
          novalidate
        >
          <div class="modal__container">
            <label for="email">Email</label>
            <Field
              class="input modal__input"
              v-model="email"
              type="email"
              id="email"
              name="email"
              :rules="fieldSchemaEmail"
            />
            <ErrorMessage name="email" class="modal__error" />
          </div>

          <div class="modal__container">
            <label for="password">Password</label>
            <Field
              name="password"
              :rules="fieldSchemaPassword"
              v-model="password"
              class="input modal__input"
              type="password"
              id="password"
              minlength="6"
            />
            <ErrorMessage name="password" class="modal__error" />
          </div>
        </Form>
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

  &__container {
    position: relative;
  }

  &__error {
    position: absolute;
    bottom: -15px;
    left: 0;
    font-size: 13px;
    line-height: normal;
    color: #b91c1c;
    font-weight: 400;
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
    gap: 30px;
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
