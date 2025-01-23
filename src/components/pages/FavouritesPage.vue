<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';
import RecipesList from '@/components/details/RecipesList.vue';
import type { CardType } from '@/components/types/types.ts';
import { changeSave, deleteRecipe, loadSavedRecipes } from '@/api/api.ts';

const cards = ref<CardType[]>([]);
const currentPage = ref(1);

onMounted(async () => {
  const cardsArray = await loadSavedRecipes();
  cards.value = cardsArray.reverse();
});

const favouritesCards = computed(() => {
  return cards.value;
});

const paginatedData = computed(() => {
  if (!favouritesCards.value || favouritesCards.value.length === 0) {
    return [];
  }
  const start = (currentPage.value - 1) * 36;
  const end = start + 36;
  return favouritesCards.value.slice(start, end);
});

const deleteSavedRecipe = async (recipe: CardType) => {
  const index = cards.value.findIndex((card) => card.id === recipe.id);
  if (index !== -1) {
    cards.value[index].isSaved = false;
    const recipeIndex = cards.value.findIndex(
      (savedRecipe: CardType) => savedRecipe.id === recipe.id
    );
    if (recipeIndex > -1) {
      cards.value.splice(recipeIndex, 1);
    }
    await changeSave(recipe.id);
    await deleteRecipe(recipe.id);
    const updatedCardsArray = await loadSavedRecipes();
    cards.value = [...updatedCardsArray.reverse()];
    const currentCardsString = sessionStorage.getItem('currentCards');
    if (currentCardsString) {
      const currentCards = JSON.parse(currentCardsString);
      const updatedCards = currentCards.map((card: CardType) => {
        if (card.id === recipe.id) {
          return { ...card, isSaved: false };
        }
        return card;
      });
      sessionStorage.setItem('currentCards', JSON.stringify(updatedCards));
    }
  }
};

watch(cards.value, (newValues) => {
  cards.value = newValues;
});

const onClickHandler = (page: number) => {
  currentPage.value = page;
  return paginatedData;
};
</script>

<template>
  <section class="favourites">
    <RecipesList
      :cards="paginatedData"
      v-if="favouritesCards.length"
      @save-recipe="deleteSavedRecipe"
    />
    <span class="favourites__warning" v-else>You don't have any favourite recipes yet</span>
    <vue-awesome-paginate
      v-if="favouritesCards.length && favouritesCards.length > 36"
      class="main__pagination"
      :total-items="favouritesCards.length"
      :items-per-page="36"
      :max-pages-shown="3"
      v-model="currentPage"
      @click="onClickHandler"
    ></vue-awesome-paginate>
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
