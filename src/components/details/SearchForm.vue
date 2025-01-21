<script setup lang="ts">
import { ref, watch } from 'vue';
import IconLoading from '@/components/icons/IconLoading.vue';

const props = defineProps<{
  initialQuery: string;
  isLoading: boolean;
  errorText: boolean;
}>();
const query = ref(props.initialQuery || '');
const emit = defineEmits(['search']);

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

const timeOptions = [
  { text: 'Choose total cooking time', value: '' },
  { text: 'Under 15 minutes', value: 'under_15_minutes' },
  { text: 'Under 30 minutes', value: 'under_30_minutes' },
  { text: 'Under 45 minutes', value: 'under_45_minutes' },
  { text: 'Under 1 hour', value: 'under_1_hour' }
];

const mealOptions = [
  { text: 'Meals', value: '' },
  { text: 'Breakfast', value: 'breakfast' },
  { text: 'Lunch', value: 'lunch' },
  { text: 'Dinner', value: 'dinner' },
  { text: 'Desserts', value: 'desserts' },
  { text: 'Snacks', value: 'snacks' }
];

const selectedTime = ref(timeOptions[0].value);
const selectedMeal = ref(mealOptions[0].value);
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
      <p class="search__error" v-if="errorText">АААААА!!!!</p>
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
    color: red;
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
