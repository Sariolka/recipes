<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { register } from '@/api/api.ts';
import { useAuthStore } from '@/stores/auth.ts';

const props = defineProps<{
  isOpen: boolean;
}>();

const store = useAuthStore();
const isLoading = ref(false);
const errorText = ref('');

const emit = defineEmits(['close', 'submit', 'open-modal']);

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .nonempty('The Password field is required')
      .min(6, { message: 'Password must be longer than 6 characters' }),
    userName: zod
      .string()
      .nonempty('Field is required')
      .min(2, { message: 'Too short' })
      .regex(/^[a-zA-Z0-9]+$/, { message: 'User  name must contain only letters and numbers' })
  })
);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema
});

const { value: email } = useField('email');
const { value: password } = useField('password');
const { value: userName } = useField('userName');

const handleRegister = async (name: string, email: string, password: string) => {
  if (isLoading.value) {
    return;
  }
  if (!name || !email || !password) {
    return;
  }
  isLoading.value = true;
  errorText.value = '';
  try {
    const newData = {
      name: name,
      email: email,
      password: password
    };
    const resSignUp = await register(newData);
    if (resSignUp && resSignUp.user && resSignUp.accessToken) {
      store.setUser(resSignUp.user.name);
      store.setToken(resSignUp.accessToken);
      return true;
    } else {
      errorText.value = resSignUp;
    }
  } catch (error: any) {
    console.error(error);
    errorText.value = error;
  } finally {
    isLoading.value = false;
  }
  return false;
};

const onSubmit = handleSubmit(async (values) => {
  const success = await handleRegister(values.userName, values.email, values.password);
  if (success) {
    handleClose();
    emit('open-modal', 'You are successfully logged in');
  }
});

const handleClose = () => {
  resetForm();
  errorText.value = '';
  emit('close');
};
</script>

<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card modal__card">
      <header class="modal-card-head modal__head">
        <p class="modal-card-title modal__title">Create an account</p>
        <button class="delete modal__close" aria-label="close" @click="handleClose"></button>
      </header>
      <section class="modal-card-body modal__body">
        <form novalidate class="modal__form" @submit.prevent="onSubmit" id="register">
          <div class="modal__container">
            <label for="name">Name</label>
            <input
              class="input modal__input"
              v-model="userName"
              type="text"
              id="userName"
              name="userName"
            />
            <span class="modal__error">{{ errors.userName }}</span>
          </div>
          <div class="modal__container">
            <label for="email">Email</label>
            <input
              class="input modal__input"
              v-model="email"
              type="email"
              id="email"
              name="email"
            />
            <span class="modal__error">{{ errors.email }}</span>
          </div>

          <div class="modal__container">
            <label for="password">Password</label>
            <input
              name="password"
              v-model="password"
              class="input modal__input"
              type="password"
              id="password"
              minlength="6"
            />
            <span class="modal__error">{{ errors.password }}</span>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot modal__foot">
        <span class="modal__error-text" v-if="errorText">{{ errorText }}</span>
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
    background-color: #ebf0e4;
  }

  &__body {
    background-color: #ebf0e4;
  }

  &__title {
    font-family: 'Rufina', sans-serif;
  }

  &__error-text {
    position: absolute;
    bottom: 90px;
    right: 30px;
    font-size: 13px;
    line-height: normal;
    color: #b91c1c;
    font-weight: 400;
  }

  &__close {
    background-image: url('../icons/close.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 24px;
    height: 24px;
  }

  &__button {
    width: 150px;
    background-color: #233000;
    padding: 9px 30px;
    font-family: 'Rufina', sans-serif;
    font-style: normal;
    font-size: 15px;
    font-weight: 700;
    line-height: normal;
    outline: transparent;
    color: #ffffff;
    border-radius: 0;
  }

  &__input {
    outline: transparent;
    margin-bottom: 5px;
    border-radius: 0;
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
    background-color: #ebf0e4;
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

  &__container {
    position: relative;
  }
}
</style>
