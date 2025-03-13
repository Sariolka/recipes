<script setup lang="ts">
import NoteComponent from '@/components/NoteComponent.vue'

const note = {
  text: 'Bla-bla-bls;dfjs spdfupsdouf pspdfoupsdofu spdofupsodufp spdoufpsodufps spdofupsdoufp osudpfousp a',
  id: 1
}
</script>

<template>
<ul class="notes-list">
<!--  <NoteComponent :note="note" />-->
<!--  <NoteComponent :note="note" />-->
<!--  <NoteComponent :note="note" />-->
<!--  <NoteComponent :note="note" />-->
<!--  <NoteComponent :note="note" />-->
<!--  <NoteComponent :note="note" />-->
  <NoteComponent :note="note" />

</ul>
</template>

<style scoped lang="scss">
.notes-list {
  margin-top: 95px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
