<script setup lang="ts">
import { ref, watch } from 'vue';
import IconLoading from '@/components/Icons/IconLoading.vue';
import { mealOptions, timeOptions } from '@/components/Constants/constants.ts';

const props = defineProps<{
  initialQuery: string;
  isLoading: boolean;
  errorText: boolean;
}>();

const query = ref(props.initialQuery || '');
const emit = defineEmits(['search']);
const selectedTime = ref(timeOptions[0].value);
const selectedMeal = ref(mealOptions[0].value);

const searchRecipes = () => {
  emit('search', query.value, 0, selectedTime.value, selectedMeal.value);
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
    <div class="search__input-container">
      <input
        :class="{ 'is-danger': errorText }"
        class="search__input input is-rounded"
        type="text"
        v-model="query"
        placeholder="Search..."
      />
      <p class="search__error" v-if="errorText">Please enter a value</p>
      <IconLoading class="search__loading" v-if="isLoading" />
      <div class="search__icon" v-else></div>
      <button class="search__btn-clear" v-if="query" @click="clearInput" type="button"></button>
    </div>
    <div class="search__select-container">
      <div class="search__select select is-rounded is-normal has-icons-left">
        <select id="time-select" v-model="selectedTime">
          <option v-for="option in timeOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="search__select select is-rounded is-normal has-icons-left">
        <select id="time-select" v-model="selectedMeal">
          <option v-for="option in mealOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <button class="search__button" type="submit">OK</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.search {
  &__input-container {
    position: relative;
  }

  &__select-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
  }

  &__input {
    width: 600px;
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

  &__error {
    position: absolute;
    color: #b91c1c;
    bottom: -22px;
    left: 12px;
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
    background-image: url('../Icons/search.svg');
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
    background-image: url('../Icons/close.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 20px;
    height: 20px;
  }

  &__button {
    background-color: #34c759;
    padding: 11px 30px;
    border-radius: 43px;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
    outline: transparent;
    color: #252525;
  }
}
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}
</style>
