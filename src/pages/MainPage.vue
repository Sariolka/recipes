<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';
import RecipesList from '@/components/RecipesList.vue';
import SearchForm from '@/components/SearchForm.vue';
import type { CardType, ResType } from '@/types/types.ts';
import { deleteRecipe, fetchRecipes, loadSavedRecipes, saveRecipe } from '@/api/api.ts';
import { CARDS_COUNT } from '../../config.ts';
import { useAuthStore } from '@/stores/auth.ts';

const store = useAuthStore();
const res = ref<ResType | null>(null);
const result = ref<any[]>([]);
const cards = ref<CardType[]>([]);
const isLoading = ref(false);
const searchPerformed = ref(false);
const totalCount = ref(0);
const searchQuery = ref('');
const counter = ref(0);
const currentPage = ref(1);
const chosenTime = ref('');
const chosenMeal = ref('');
const errorText = ref(false);
const savedRecipes = ref<CardType[]>([]);
const emit = defineEmits(['open-modal']);

// Сохранить/удалить рецепт
const toggleSave = async (recipe: CardType) => {
  const index = cards.value.findIndex((card) => card.id === recipe.id);
  if (index !== -1) {
    cards.value[index].isSaved = !cards.value[index].isSaved;
    if (cards.value[index].isSaved) {
      await saveRecipe(recipe);
    } else {
      savedRecipes.value = await loadSavedRecipes();
      const recipeIndex = savedRecipes.value.findIndex(
        (savedRecipe) => savedRecipe.id === recipe.id
      );
      if (recipeIndex > -1) {
        savedRecipes.value.splice(recipeIndex, 1);
        await deleteRecipe(recipe.id);
      }
    }
    sessionStorage.setItem('currentCards', JSON.stringify(cards.value));
  }
};

//Поиск
const getRecipes = async (query: string, counter: number, timeTag?: string, meal?: string) => {
  if (!query) {
    errorText.value = true;
    return;
  }
  isLoading.value = true;
  searchPerformed.value = true;
  searchQuery.value = query;
  chosenTime.value = timeTag || '';
  chosenMeal.value = meal || '';
  const lastSearchObject = {
    query: searchQuery.value,
    time: chosenTime.value || '',
    meal: chosenMeal.value || ''
  };
  sessionStorage.setItem('lastSearchObject', JSON.stringify(lastSearchObject));
  try {
    res.value = (await fetchRecipes(query, counter, timeTag, meal)) as ResType;
    result.value = res.value.results;
    totalCount.value = res.value.count;
    store.setData();
    savedRecipes.value = await loadSavedRecipes();
    if (result.value.length) {
      cards.value = result.value.map((recipe: any) => ({
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        thumbnailUrl: recipe.thumbnail_url,
        minutes: recipe.total_time_minutes,
        id: recipe.id.toString(),
        isSaved: savedRecipes.value.some((i) => i.id === recipe.id),
        tags: recipe.tags
      }));
    } else {
      cards.value = [];
    }
    sessionStorage.setItem('currentCards', JSON.stringify(cards.value));
    sessionStorage.setItem('totalCount', JSON.stringify(totalCount.value));
    return cards.value;
  } catch (err) {
    if (err.statusCode === 429) {
      emit(
        'open-modal',
        'К сожалению, лимит запросов на месяц исчерпан. :( ' +
          'You have exceeded the MONTHLY quota for Requests on your current plan, BASIC.'
      );
    } else {
      emit('open-modal', 'Произошла ошибка при загрузке рецептов');
    }
  } finally {
    isLoading.value = false;
    errorText.value = false;
  }
};

watch(
  cards,
  (newValues) => {
    cards.value = newValues;
  },
  { deep: true }
);

//Работа пагинации
const onClickHandler = async (page: number) => {
  const lastSearchString = sessionStorage.getItem('lastSearchObject');
  let lastSearchQuery = '';
  let chosenTime = '';
  let chosenMeal = '';

  if (lastSearchString) {
    const lastSearch = JSON.parse(lastSearchString);
    lastSearchQuery = lastSearch.query || '';
    chosenTime = lastSearch.time || '';
    chosenMeal = lastSearch.meal || '';
  }
  counter.value = CARDS_COUNT * (page - 1);
  currentPage.value = page;
  sessionStorage.setItem('currentPage', currentPage.value.toString());
  if (lastSearchQuery) {
    await getRecipes(lastSearchQuery, counter.value, chosenTime, chosenMeal);
  }
};

//Начальная загрузка
onMounted(async () => {
  const lastSearchObject = sessionStorage.getItem('lastSearchObject');
  let lastSearchQuery = '';
  if (lastSearchObject) {
    lastSearchQuery = JSON.parse(lastSearchObject).query;
  }
  const savedCurrentPage = sessionStorage.getItem('currentPage');
  const currentCards = sessionStorage.getItem('currentCards');
  const totalCounter = sessionStorage.getItem('totalCount');
  if (lastSearchQuery) {
    searchQuery.value = lastSearchQuery;

    if (currentCards) {
      cards.value = JSON.parse(currentCards);
      store.setData();
      if (totalCounter) {
        totalCount.value = JSON.parse(totalCounter);
      }
    } else {
      cards.value = [];
      totalCount.value = 0;
    }
  }
  if (savedCurrentPage) {
    currentPage.value = parseInt(savedCurrentPage, 10);
  }
});
</script>

<template>
  <main class="main">
    <SearchForm
      :errorText="errorText"
      @search="getRecipes"
      class="main__search-form"
      :isLoading="isLoading"
      :initialQuery="searchQuery"
    />
    <RecipesList :cards="cards" v-if="cards.length" @save-recipe="toggleSave" />
    <p class="main__warning" v-if="searchPerformed && result.length === 0 && !isLoading">
      Nothing found
    </p>
    <vue-awesome-paginate
      v-if="cards.length && totalCount > CARDS_COUNT"
      class="main__pagination"
      :total-items="totalCount"
      :items-per-page="CARDS_COUNT"
      :max-pages-shown="3"
      v-model="currentPage"
      @click="onClickHandler"
    ></vue-awesome-paginate>
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__btn {
    width: 100px;
  }

  &__search-form {
    margin-top: 70px;
  }

  &__warning {
    margin-top: 50px;
    font-size: 28px;
    line-height: 28px;
    color: #d9d9d9;
    font-weight: 400;
  }
}
</style>
