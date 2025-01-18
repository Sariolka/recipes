<script setup lang="ts">
import type { CardType } from '@/components/types/types.ts'
import { computed } from 'vue'
import { REDIRECT_URL } from '../../../config.ts'

const props = defineProps<{
  card: CardType
}>()

const computedTime = computed(() => {
  let hours = 0
  let minutes = 0
  if (props.card.minutes >= 60) {
    hours = Math.floor(props.card.minutes / 60)
    minutes = props.card.minutes - hours * 60
    return `${hours} hours ${minutes} minutes`
  } else {
    return `${props.card.minutes} minutes`
  }
})
</script>

<template>
  <li class="card">
    <img class="card__image" :src="card.thumbnailUrl" :alt="card.name" />
    <div class="card__info">
      <h3 class="card__title">{{ card.name }}</h3>
      <span class="card__time-control" v-if="card.minutes !== 0"
        >Cooking time: {{ computedTime }}</span
      >
      <p class="card__description">{{ card.description }}</p>
      <div class="card__footer">
        <a :href="REDIRECT_URL + `${card.slug}`" class="card__link" target="_blank">SHOW MORE</a>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 520px;
  box-shadow: 0 2px 5px 0 #0000001a;
  background-color: #252525;
  border-radius: 6px;
  cursor: default;

  &__image {
    width: 350px;
    height: 260px;
    aspect-ratio: 35/26;
    border-radius: 6px 6px 0 0;
    object-fit: cover;
    object-position: center;
    position: relative;
    background-color: black;
    background-size: cover;
    background-position: center;
  }

  //&__image::before {
  //  width: 350px;
  //  height: 260px;
  //  position: absolute;
  //  font-size: 0;
  //  background-color: #575757;
  //  top: 0;
  //  display: block;
  //  content: '';
  //  z-index: 1;
  //}
  //
  //&__image::after {
  //  display: block;
  //  position: absolute;
  //  content: '';
  //  font-size: 0;
  //  z-index: 2;
  //  top: 0;
  //  left: 0;
  //  width: 350px;
  //  height: 260px;
  //  background-color: #575757;
  //  background-position: center;
  //  background-size: cover;
  //}

  &__info {
    display: flex;
    flex-direction: column;
    padding: 26px 26px;
    flex-grow: 1;
  }

  &__title {
    font-size: 28px;
    line-height: 28px;
    color: #d9d9d9;
    font-weight: 400;
    margin-bottom: 2px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &__time-control {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.15px;
    color: #a4a8b2;
    margin-bottom: 20px;
  }

  &__description {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.16px;
    color: #85878c;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: auto;
  }

  &__footer {
    display: flex;
    align-self: end;
    margin-top: 20px;
  }

  &__link {
    font-size: 10px;
    font-weight: 900;
    line-height: normal;
    text-decoration: none;
    border-radius: 40px;
    color: #252525;
    background-color: #34c759;
    padding: 13px 40px;
    height: 40px;
    white-space: nowrap;
  }
}
</style>
