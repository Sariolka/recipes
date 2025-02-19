<script setup lang="ts">
import { useRoute } from 'vue-router';
import { pushTo404 } from '@/helpers/pushTo404.ts';
import { ref } from 'vue';
import { getCurrentRecipe } from '@/api/api.ts';

const route = useRoute();
const recipe = ref({});
const isLoading = ref(true);

const loadRecipe = async () => {
  const recipeId = Number(route.params.id);

  if (isNaN(recipeId) || recipeId <= 0) {
    console.error('Произошла ошибка');
    pushTo404();
    return;
  }
  try {
    recipe.value = await getCurrentRecipe(recipeId);
  } catch (error) {
    console.error(error);
    pushTo404();
    recipe.value = {};
  } finally {
    isLoading.value = false;
  }
};

loadRecipe();

// const nutritionData = [
//   {
//     Calories: recipe.value.nutrition.calories,
//     Fat: recipe.value.nutrition.fat,
//     Carbs: recipe.value.nutrition.carbohydrates,
//     Sugar: recipe.value.nutrition.sugar,
//     Fiber: recipe.value.nutrition.fiber,
//     Protein: recipe.value.nutrition.protein
//   }
// ];
</script>

<template>
  <section class="recipe-page">
<!--    <h1 class="recipe-page__title">{{ recipe.name }}</h1>-->
<!--    <p class="recipe-page__description">{{ recipe.description }}</p>-->
<!--    <h2 class="recipe-page__nutrition">Nutrition Info</h2>-->
<!--    <ul class="recipe-page__nutrition-list">-->
<!--      <li class="recipe-page__nutrition-item"></li>-->
<!--    </ul>-->
<!--    <video-->
<!--      :poster="recipe?.thumbnail_url"-->
<!--      :src="recipe?.original_video_url"-->
<!--      typeof="video/mp4"-->
<!--      preload="metadata"-->
<!--      class="recipe-page__video"-->
<!--    ></video>-->
  </section>
</template>

<style scoped lang="scss"></style>
