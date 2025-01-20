<script setup lang="ts">
import { ref, watch } from 'vue';
import IconLoading from '@/components/icons/IconLoading.vue';

const props = defineProps<{
  initialQuery: string;
  isLoading: boolean;
}>();

const query = ref(props.initialQuery || '');
const emit = defineEmits(['search']);

const searchRecipes = () => {
  emit('search', query.value);
};

const clearInput = () => {
  query.value = '';
};

watch(
  () => props.initialQuery,
  (newValue) => {
    query.value = newValue;
  }
);
</script>

<template>
  <form class="search" action="/search" role="search" method="get" @submit.prevent="searchRecipes">
    <input type="search" class="search__input" v-model="query" placeholder="Search..." />
    <IconLoading class="search__loading" v-if="isLoading" />
    <div class="search__icon" v-else></div>
    <button class="search__btn-clear" v-if="query" @click="clearInput" type="button"></button>
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

  &__btn-clear {
    cursor: pointer;
    border: none;
    background-color: transparent;
    position: absolute;
    bottom: 11px;
    right: 12px;
    background-image: url('../icons/close.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 20px;
    height: 20px;
  }
}
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
