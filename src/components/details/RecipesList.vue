<script setup lang="ts">
import RecipeCard from '@/components/details/RecipeCard.vue'
import type { CardType } from '@/components/types/types.ts'

const props = defineProps<{
  cards: CardType[]
}>()
</script>

<template>
  <section class="recipes">
    <h2 class="recipes__title">Список рецептов</h2>
    <ul class="recipes__list">
      <RecipeCard v-for="card in cards" :key="card.id" :card="card" />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.recipes {
  margin-top: 70px;
  &__title {
    display: none;
  }

  &__list {
    list-style: none;
    display: grid;
    padding-left: 0;
    gap: 30px;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1150px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1550px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
