<script setup lang="ts">
import { ref } from 'vue'
import IconLoading from '@/components/icons/IconLoading.vue'
const props = defineProps<{
  isLoading: boolean
}>()
const emit = defineEmits(['search'])

const query = ref('')

const searchRecipes = () => {
  emit('search', query.value)
  query.value = ''
}
</script>

<template>
  <form class="search" action="/search" role="search" method="get" @submit.prevent="searchRecipes">
    <input
      type="search"
      class="search__input"
      v-model="query"
      :placeholder="isLoading ? 'Searching...' : 'Search...'"
    />
    <IconLoading class="search__loading" v-if="isLoading" />
    <div class="search__icon" v-else></div>
  </form>
</template>

<style scoped lang="scss">
.search {
  position: relative;

  &__input {
    width: 500px;
    background-color: #fff;
    padding: 12px 16px 12px 40px;
    border-radius: 43px;
    border: none;
    outline: transparent;
    color: #252525;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    line-height: normal;

    &::placeholder {
      color: #252525;
    }
  }

  &__loading {
    position: absolute;
    bottom: 8.5px;
    left: 10px;
  }

  &__icon {
    position: absolute;
    bottom: 14px;
    left: 12px;
    background-image: url('../icons/search.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 16px;
    height: 16px;
  }
}
</style>
