<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  text: string;
}>();
</script>

<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card modal__card">
      <header class="modal-card-head modal__head">
        <button class="delete modal__close" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <p class="modal__title">{{ text }}</p>
      </section>
      <footer class="modal-card-foot modal__foot"></footer>
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
    display: flex;
    justify-content: end;
    align-items: center;
  }

  &__foot {
    background-color: #fff;
    position: relative;
  }

  &__close {
    background-image: url('../Icons/close.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 24px;
    height: 24px;
  }

  &__title {
    font-size: 20px;
    line-height: normal;
    color: #5e6600;
    font-weight: 400;
  }
}

.modal-card-body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 0;
}

.modal-content {
  background-color: #fff;
  width: 400px;
}
</style>
