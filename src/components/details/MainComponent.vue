<script setup lang="ts">
import video from '../video.mp4'
import videoWebm from '../video-webm.webm'
import { fetchRecipes } from '@/api/api.ts'
import SearchForm from '@/components/details/SearchForm.vue'
import RecipesList from '@/components/details/RecipesList.vue'
import { ref, watch } from 'vue'
import type { CardType } from '@/components/types/types.ts'
import HeaderComponent from '@/components/details/HeaderComponent.vue'

const res = ref<any[]>([])
const cards = ref<CardType[]>([])
const isLoading = ref(false)

const getRecipes = async (query: string) => {
  isLoading.value = true
  try {
    res.value = await fetchRecipes(query)
    if (res.value.length) {
      cards.value = res.value.map((recipe: any) => ({
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        thumbnailUrl: recipe.thumbnail_url,
        minutes: recipe.total_time_minutes,
        id: recipe.id,
      }))
    }
    return cards.value
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

watch(cards.value, (newValues) => {
  cards.value = newValues
})
</script>

<template>
  <section class="page">
    <HeaderComponent />
    <main class="page__main">
      <video autoPlay playsInline muted loop class="page__video">
        <source :src="videoWebm" type="video/webm" />
        <source :src="video" type="video/mp4" />
        Ваш браузер не поддерживает встроенные видео
      </video>
      <SearchForm @search="getRecipes" class="page__search-form" :isLoading="isLoading" />
      <RecipesList :cards="cards" v-if="cards.length" />
    </main>
  </section>
</template>

<style scoped lang="scss">
.page {
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__video {
    height: 100vh;
    left: 0;
    object-fit: cover;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: -1;
  }

  &__search-form {
    margin-top: 70px;
  }
}
</style>
