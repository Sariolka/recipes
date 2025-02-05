<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { useAuthStore } from '@/components/Stores/auth.ts';
import { ref } from 'vue';
import { signin } from '@/api/api.ts';

const props = defineProps<{
  isOpen: boolean;
}>();

const store = useAuthStore();
const isLoading = ref(false);
const errorText = ref('');

const emit = defineEmits(['close', 'submit', 'open-modal', 'openRegisterModal']);

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().nonempty('Field is required').email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .nonempty('The Password field is required')
      .min(6, { message: 'Password must be longer than 6 characters' })
  })
);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema
});

const { value: email } = useField('email');
const { value: password } = useField('password');

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
    if (resSignin && resSignin.user && resSignin.accessToken) {
      store.setUser(resSignin.user.name);
      store.setToken(resSignin.accessToken);
      return true;
    } else {
      errorText.value = resSignin;
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
  const success = await handleSignin(values.email, values.password);
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
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card modal__card">
      <header class="modal-card-head modal__head">
        <p class="modal-card-title">Access Your Account</p>
        <button class="delete modal__close" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <form class="modal__form" @submit.prevent="onSubmit" id="login">
          <div class="modal__container">
            <label for="email">Email</label>
            <input class="input modal__input" v-model="email" type="email" id="email" />
            <span class="modal__error">{{ errors.email }}</span>
          </div>

          <div class="modal__container">
            <label for="password">Password</label>
            <input
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
  &__foot {
    background-color: #fff;
    position: relative;
  }

  &__error-text {
    position: absolute;
    bottom: 90px;
    right: 32px;
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
