<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { VueAwesomePaginate } from 'vue-awesome-paginate';
import RecipesList from '@/components/Details/RecipesList.vue';
import type { CardType } from '@/components/types/types.ts';
import { changeSave, deleteRecipe, loadSavedRecipes } from '@/api/api.ts';
import { CARDS_COUNT } from '../../../config.ts';

const cards = ref<CardType[]>([]);
const currentPage = ref(1);
const activeStatus = ref('all');

onMounted(async () => {
  const cardsArray = await loadSavedRecipes();
  cards.value = cardsArray.reverse();
});

const favouritesCards = computed(() => {
  if (!cards.value || cards.value.length === 0) {
    return [];
  } else {
    if (activeStatus.value === 'all') {
      return cards.value;
    }
    return cards.value.filter((card) => {
      return card.tags && card.tags.some((tag) => tag.name === activeStatus.value);
    });
  }
});

const paginatedData = computed(() => {
  if (!favouritesCards.value || favouritesCards.value.length === 0) {
    return [];
  }
  const start = (currentPage.value - 1) * CARDS_COUNT;
  const end = start + CARDS_COUNT;
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

const handleChooseMeal = (section: string) => {
  activeStatus.value = section;
};
</script>

<template>
  <section class="favourites">
    <nav class="favourites__nav">
      <ul class="favourites__nav-list">
        <li class="favourites__nav-item">
          <button
            class="favourites__nav-button"
            @click="handleChooseMeal('all')"
            :class="{ 'favourites__nav-button_active': activeStatus === 'all' }"
          >
            All Meals
          </button>
        </li>
        <li class="favourites__nav-item">
          <button
            class="favourites__nav-button"
            :class="{ 'favourites__nav-button_active': activeStatus === 'breakfast' }"
            @click="handleChooseMeal('breakfast')"
          >
            Breakfast
          </button>
        </li>
        <li class="favourites__nav-item">
          <button
            class="favourites__nav-button"
            :class="{ 'favourites__nav-button_active': activeStatus === 'lunch' }"
            @click="handleChooseMeal('lunch')"
          >
            Lunch
          </button>
        </li>
        <li class="favourites__nav-item">
          <button
            class="favourites__nav-button"
            :class="{ 'favourites__nav-button_active': activeStatus === 'dinner' }"
            @click="handleChooseMeal('dinner')"
          >
            Dinner
          </button>
        </li>
        <li class="favourites__nav-item">
          <button
            class="favourites__nav-button"
            :class="{ 'favourites__nav-button_active': activeStatus === 'desserts' }"
            @click="handleChooseMeal('desserts')"
          >
            Desserts
          </button>
        </li>
        <li class="favourites__nav-item">
          <button
            class="favourites__nav-button"
            :class="{ 'favourites__nav-button_active': activeStatus === 'snacks' }"
            @click="handleChooseMeal('snacks')"
          >
            Snacks
          </button>
        </li>
      </ul>
    </nav>
    <div class="favourites__content">
      <RecipesList
        :cards="paginatedData"
        v-if="favouritesCards.length"
        @save-recipe="deleteSavedRecipe"
      />
      <span class="favourites__warning" v-else>You don't have any favourite recipes yet</span>
      <vue-awesome-paginate
        v-if="favouritesCards.length && favouritesCards.length > CARDS_COUNT"
        class="main__pagination"
        :total-items="favouritesCards.length"
        :items-per-page="CARDS_COUNT"
        :max-pages-shown="3"
        v-model="currentPage"
        @click="onClickHandler"
      ></vue-awesome-paginate>
    </div>
  </section>
</template>

<style scoped lang="scss">
.favourites {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;

  &__warning {
    margin-top: 150px;
    font-size: 28px;
    line-height: 28px;
    color: #d9d9d9;
    font-weight: 400;
    margin-left: auto;
    margin-right: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__nav {
    margin-top: 70px;
    width: 120px;
  }

  &__nav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__nav-item {
    cursor: pointer;
    transition: color 0.2s;
    font-size: 22px;
    line-height: normal;
    color: #d9d9d9;
    font-weight: 400;

    &:hover {
      color: #85878c;
    }
  }

  &__nav-button {
    border: none;
    background-color: transparent;

    &_active {
      border-bottom: 2px solid #85878c;
    }
  }
}
</style>
