<script setup lang="ts">
import RecipesList from '@/components/details/RecipesList.vue';
import SearchForm from '@/components/details/SearchForm.vue';
import { ref, watch } from 'vue';
import type { CardType, ResType } from '@/components/types/types.ts';
import { fetchRecipes } from '@/api/api.ts';
import { loadSavedRecipes, saveRecipesToLocalStorage } from '@/components/helpers/helpers.ts';

const res = ref<ResType | null>(null);
const result = ref<any[]>([]);
const cards = ref<CardType[]>([]);
const isLoading = ref(false);
const searchPerformed = ref(false);
const totalCount = ref(0);

// const loadSavedRecipes = () => {
//   const saved = localStorage.getItem('savedRecipes')
//   return saved ? JSON.parse(saved) : []
// }

console.log(localStorage.getItem('savedRecipes'));
console.log(JSON.parse(localStorage.getItem('savedRecipes')));

//Сохранение рецептов в локальном хранилище
// const saveRecipesToLocalStorage = (recipes: CardType[]) => {
//   console.log(JSON.stringify(recipes))
//   localStorage.setItem('savedRecipes', JSON.stringify(recipes))
// }

// Сохранить/удалить рецепт
const toggleSave = (recipe: CardType) => {
  const index = cards.value.findIndex((card) => card.id === recipe.id);
  if (index !== -1) {
    cards.value[index].isSaved = !cards.value[index].isSaved;
    const savedRecipes = loadSavedRecipes();
    console.log(savedRecipes);
    if (cards.value[index].isSaved && index !== recipe.id) {
      savedRecipes.push(recipe);
    } else {
      const recipeIndex = savedRecipes.findIndex((savedRecipe) => savedRecipe.id === recipe.id);
      if (recipeIndex > -1) {
        savedRecipes.splice(recipeIndex, 1);
      }
    }
    saveRecipesToLocalStorage(savedRecipes);
  }
};

//Поиск
const getRecipes = async (query: string) => {
  isLoading.value = true;
  searchPerformed.value = true;
  try {
    res.value = (await fetchRecipes(query)) as ResType;
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
    return cards.value;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

watch(cards.value, (newValues) => {
  cards.value = newValues;
});
</script>

<template>
  <main class="main">
    <SearchForm @search="getRecipes" class="main__search-form" :isLoading="isLoading" />
    <RecipesList :cards="cards" v-if="cards.length" @save-recipe="toggleSave" />
    <p class="main__warning" v-if="searchPerformed && result.length === 0 && !isLoading">
      Nothing found
    </p>
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
