<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { CardType } from '@/components/types/types.ts';
import RecipesList from '@/components/details/RecipesList.vue';
import { loadSavedRecipes, saveRecipesToLocalStorage } from '@/components/helpers/helpers.ts';

const cards = ref<CardType[]>([]);

onMounted(() => {
  cards.value = loadSavedRecipes();
});

const favouritesCards = computed(() => {
  return cards.value;
});

const deleteSavedRecipe = (recipe: CardType) => {
  const index = cards.value.findIndex((card) => card.id === recipe.id);
  if (index !== -1) {
    cards.value[index].isSaved = false;
    const savedRecipes = loadSavedRecipes();
    const recipeIndex = savedRecipes.findIndex((savedRecipe) => savedRecipe.id === recipe.id);
    if (recipeIndex > -1) {
      savedRecipes.splice(recipeIndex, 1);
    }
    saveRecipesToLocalStorage(savedRecipes);
    cards.value.splice(index, 1);
  }
};

watch(cards.value, (newValues) => {
  cards.value = newValues;
});
</script>

<template>
  <section class="favourites">
    <RecipesList :cards="favouritesCards" v-if="favouritesCards.length" @save-recipe="deleteSavedRecipe" />
    <span class="favourites__warning" v-else>You don't have any favourite recipes yet</span>
  </section>
</template>

<style scoped lang="scss">
.favourites {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__warning {
    margin-top: 250px;
    font-size: 28px;
    line-height: 28px;
    color: #d9d9d9;
    font-weight: 400;
  }
}
</style>
