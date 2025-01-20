<script setup lang="ts">
import RecipesList from '@/components/details/RecipesList.vue';
import SearchForm from '@/components/details/SearchForm.vue';
import { onMounted, ref, watch } from 'vue';
import type { CardType, ResType } from '@/components/types/types.ts';
import { fetchRecipes } from '@/api/api.ts';
import { loadSavedRecipes, saveRecipesToLocalStorage } from '@/components/helpers/helpers.ts';
import { VueAwesomePaginate } from 'vue-awesome-paginate';

const res = ref<ResType | null>(null);
const result = ref<any[]>([]);
const cards = ref<CardType[]>([]);
const isLoading = ref(false);
const searchPerformed = ref(false);
const totalCount = ref(0);
const searchQuery = ref('');
const counter = ref(0);
const currentPage = ref(1);

// Сохранить/удалить рецепт
const toggleSave = (recipe: CardType) => {
  const index = cards.value.findIndex((card) => card.id === recipe.id);
  if (index !== -1) {
    cards.value[index].isSaved = !cards.value[index].isSaved;
    const savedRecipes = loadSavedRecipes();
    if (cards.value[index].isSaved && index !== recipe.id) {
      savedRecipes.unshift(recipe);
    } else {
      const recipeIndex = savedRecipes.findIndex((savedRecipe) => savedRecipe.id === recipe.id);
      if (recipeIndex > -1) {
        savedRecipes.splice(recipeIndex, 1);
      }
    }
    saveRecipesToLocalStorage(savedRecipes);
    sessionStorage.setItem('currentCards', JSON.stringify(cards.value));
  }
};

//Поиск
const getRecipes = async (query: string, counter: number) => {
  isLoading.value = true;
  searchPerformed.value = true;
  searchQuery.value = query;
  sessionStorage.setItem('searchQuery', searchQuery.value);
  try {
    res.value = (await fetchRecipes(query, counter)) as ResType;
    result.value = res.value.results;
    totalCount.value = res.value.count;
    const savedRecipes = loadSavedRecipes();
    if (result.value.length) {
      cards.value = result.value.map((recipe: any) => ({
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        thumbnailUrl: recipe.thumbnail_url,
        minutes: recipe.total_time_minutes,
        id: recipe.id,
        isSaved: savedRecipes.some((i) => i.id === recipe.id)
      }));
    } else {
      cards.value = [];
    }
    sessionStorage.setItem('currentCards', JSON.stringify(cards.value));
    sessionStorage.setItem('totalCount', JSON.stringify(totalCount.value));
    return cards.value;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

watch(
  cards,
  (newValues) => {
    cards.value = newValues;
  },
  { deep: true }
);

const onClickHandler = async (page: number) => {
  const lastSearchQuery = sessionStorage.getItem('searchQuery');
  counter.value = 36 * (page - 1);
  currentPage.value = page;
  sessionStorage.setItem('currentPage', currentPage.value.toString());
  if (lastSearchQuery) {
    await getRecipes(lastSearchQuery, counter.value);
  }
};

onMounted(async () => {
  const lastSearchQuery = sessionStorage.getItem('searchQuery');
  const currentCards = sessionStorage.getItem('currentCards');
  const savedCurrentPage = sessionStorage.getItem('currentPage');
  const totalCounter = sessionStorage.getItem('totalCount');
  if (lastSearchQuery) {
    searchQuery.value = lastSearchQuery;
    if (currentCards) {
      cards.value = JSON.parse(currentCards);
      totalCount.value = JSON.parse(totalCounter);
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
      v-if="cards.length && totalCount > 36"
      class="main__pagination"
      :total-items="totalCount"
      :items-per-page="36"
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
