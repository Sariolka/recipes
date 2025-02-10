<script setup lang="ts">
import RecipeCard from '@/components/Details/RecipeCard.vue';
import type { CardType } from '@/types/types.ts';

const props = defineProps<{
  cards: CardType[];
}>();
</script>

<template>
  <section class="recipes">
    <h2 class="recipes__title">Список рецептов</h2>
    <ul class="recipes__list">
      <RecipeCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @save-recipe="$emit('save-recipe', card)"
      />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.recipes {
  margin-top: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__title {
    display: none;
  }

  &__list {
    list-style: none;
    display: grid;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    gap: 60px 40px;
    grid-template-columns: repeat(auto-fill, 350px);
  }
}
</style>
