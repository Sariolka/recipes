<script setup lang="ts">
import NoteComponent from '@/components/NoteComponent.vue';
import type { INote } from '@/types/types.ts';

const props = defineProps<{
  notes: INote[];
  isInputActive?: string | null;
}>();

const emit = defineEmits(['edit', 'delete', 'open']);

const handleEditText = (note: INote) => {
  emit('edit', note);
};

const handleDeleteNote = (index: number) => {
  emit('delete', index);
};

const handleOpenInput = (id: string) => {
  emit('open', id);
};
</script>

<template>
  <ul class="notes-list">
    <NoteComponent
      v-for="(note, index) in notes"
      :note="note"
      :key="note.id"
      :index="index"
      @open="handleOpenInput"
      @delete="handleDeleteNote"
      :isInputActive="isInputActive === note.id"
      @edit="handleEditText"
    />
  </ul>
</template>

<style scoped lang="scss">
.notes-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
