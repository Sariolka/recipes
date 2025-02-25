<script setup lang="ts">
const props = defineProps<{
  rating: number;
  id: string;
}>();
</script>

<template>
  <svg width="110" height="20" viewBox="0 0 110 20">
    <defs>
      <mask :id="`mask-${props.id}`">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <rect :x="`${rating}%`" y="0" width="100%" height="100%" fill="grey" />
      </mask>

      <symbol viewBox="0 0 30 30" id="star">
        <path
          d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z"
        />
      </symbol>
      <symbol viewBox="0 0 110 20" id="stars">
        <use xlink:href="#star" x="-44" y="0"></use>
        <use xlink:href="#star" x="-24" y="0"></use>
        <use xlink:href="#star" x="-4" y="0"></use>
        <use xlink:href="#star" x="16" y="0"></use>
        <use xlink:href="#star" x="36" y="0"></use>
      </symbol>
    </defs>

    <use xlink:href="#stars" fill="#bb0a1e" stroke="black" :mask="`url(#mask-${props.id})`"></use>
  </svg>
</template>

<style scoped lang="scss"></style>
