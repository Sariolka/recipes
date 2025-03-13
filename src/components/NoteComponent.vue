<script setup lang="ts">
import type { INote } from '@/types/types.ts'

const props = defineProps<{
  note: INote
}>()
</script>

<template>
<li class="recipe-note">
  <div class="recipe-note__content">
    <span class="recipe-note__index">
      {{note.id + 1}}.
    </span>
    <p class="recipe-note__text">{{note.text}}</p>
  </div>
  <div class="recipe-note__control">
    <button class="recipe-note__button recipe-note__button_type-edit" aria-label="Edit note" @click="$emit('edit', note)"></button>
    <button class="recipe-note__button recipe-note__button_type-delete" aria-label="Delete note"  @click="$emit('delete', note.id)"></button>
  </div>
</li>
</template>

<style scoped lang="scss">
.recipe-note {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-radius: 10px;
  gap: 10px;
  background-color: rgba(219, 223, 233, 0.2);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #252f4a;

  &__content {
    display: flex;
    align-items: start;
    gap: 7px;
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

    &_type-edit
    {
      background-image: url('@/icons/pencil.svg')
    }

    &_type-delete
    {
      background-image: url('@/icons/trash.svg')
    }

  }



}
</style>
