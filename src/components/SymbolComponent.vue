<script setup lang="ts">
const props = defineProps<{
  index: number;
}>();
</script>

<template>
  <div class="symbol">
    {{ index }}
  </div>
</template>

<style scoped lang="scss">
.symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 22px;
  line-height: 28px;
  font-weight: 700;
  color: #fff;
  background-color: #323232;
  border-radius: 50%;
  border: 1px solid #000;
  aspect-ratio: 1;
}
</style>
