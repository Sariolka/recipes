<script setup lang="ts">
import type { INote } from '@/types/types.ts';
import { ref } from 'vue';

const props = defineProps<{
  note: INote;
  isInputActive?: boolean;
  index: number;
}>();

const emit = defineEmits(['edit', 'delete', 'open']);
const changedText = ref(props.note.text || '');

const handleToggleInput = () => {
  if (props.isInputActive) {
    const note = { text: changedText.value, id: props.note.id, recipeId: props.note.recipeId };
    emit('edit', note);
  } else {
    emit('open', props.note.id);
  }
};
</script>

<template>
  <li class="recipe-note">
    <div class="recipe-note__content">
      <span class="recipe-note__index"> {{ index + 1 }}. </span>
      <input
        type="text"
        class="recipe-note__input"
        v-if="isInputActive || !changedText"
        autofocus
        v-model="changedText"
        maxlength="400"
      />
      <p class="recipe-note__text" v-else>{{ note.text }}</p>
    </div>
    <div class="recipe-note__control">
      <button
        class="recipe-note__button recipe-note__button_type-edit"
        :class="{ 'recipe-note__button_type-save': isInputActive }"
        aria-label="Edit note"
        @click="handleToggleInput"
      ></button>
      <button
        class="recipe-note__button recipe-note__button_type-delete"
        aria-label="Delete note"
        @click="$emit('delete', note.id)"
      ></button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.recipe-note {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 18px 20px;
  border-radius: 10px;
  gap: 10px;
  background-color: rgba(219, 223, 233, 0.2);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  &__content {
    display: flex;
    align-items: start;
    gap: 7px;
    width: 100%;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__button {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &_type-edit {
      background-image: url('@/icons/pencil.svg');
    }

    &_type-delete {
      background-image: url('@/icons/trash.svg');
    }

    &_type-save {
      background-image: url('@/icons/save.svg');
    }
  }

  &__text {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-left: 2px;
  }

  &__input {
    border: none;
    outline: transparent;
    width: 100%;
    background-color: transparent;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    height: 24px;
  }
}
</style>
