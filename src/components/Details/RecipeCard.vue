<script setup lang="ts">
import { computed } from 'vue';
import type { CardType } from '@/components/types/types.ts';
import { REDIRECT_URL, TIME_MINUTES } from '../../../config.ts';
import { useAuthStore } from '@/components/Stores/auth.ts';
import router from '@/router/router.ts';
const store = useAuthStore();

const props = defineProps<{
  card: CardType;
}>();

const isAuthenticated = computed(() => store.token);

const computedTime = computed(() => {
  let hours = 0;
  let minutes = 0;
  if (props.card.minutes >= TIME_MINUTES) {
    hours = Math.floor(props.card.minutes / TIME_MINUTES);
    minutes = props.card.minutes - hours * TIME_MINUTES;
    return `${hours} hr ${minutes} min`;
  } else {
    return `${props.card.minutes} minutes`;
  }
});
</script>

<template>
  <li class="card">
    <img class="card__image" :src="card.thumbnailUrl" :alt="card.name" />
    <button
      v-if="isAuthenticated"
      class="card__like"
      :class="{ card__like_active: card.isSaved }"
      @click="$emit('save-recipe')"
    ></button>
    <div class="card__info">
      <h3 class="card__title">{{ card.name }}</h3>
      <span class="card__time-control" v-if="card.minutes !== 0"
        >Total cooking time: {{ computedTime }}</span
      >
      <p class="card__description">
        {{ !card.description ? "Click 'Show more' to get more information" : card.description }}
      </p>
      <div class="card__footer">
        <router-link :to="`/${card.id}`" class="card__link">SHOW MORE</router-link>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 530px;
  box-shadow: 0 2px 5px 0 #0000001a;
  background-color: #ebf0e4;
  cursor: default;
  position: relative;

  &__image {
    width: 350px;
    height: 260px;
    aspect-ratio: 35/26;
    object-fit: cover;
    object-position: center;
    position: relative;
    background-color: #000;
    background-size: cover;
    background-position: center;
  }

  &__image::before {
    width: 350px;
    height: 260px;
    position: absolute;
    font-size: 0;
    background-color: #575757;
    top: 0;
    display: block;
    content: '';
    z-index: 1;
  }

  &__image::after {
    display: block;
    position: absolute;
    content: '';
    font-size: 0;
    z-index: 2;
    top: 0;
    left: 0;
    width: 350px;
    height: 260px;
    background-color: #575757;
    background-position: center;
    background-size: cover;
  }

  &__like {
    background-image: url('../Icons/mark.svg');
    width: 27px;
    height: 27px;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 15px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &_active {
      background-image: url('../Icons/mark-fill.svg');
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    padding: 20px 26px;
    flex-grow: 1;
  }

  &__title {
    font-family: 'Rufina', sans-serif;
    font-size: 28px;
    line-height: normal;
    color: #000000;
    font-weight: 400;
    margin-bottom: 2px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &__time-control {
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.15px;
    color: #4d4d4d;
    margin-bottom: 20px;
  }

  &__description {
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.16px;
    color: #4d4d4d;
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
    font-family: 'Rufina', sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: normal;
    text-decoration: none;
    color: #ffffff;
    background-color: #5e6600;
    box-shadow: 1px 1px 12px 0 #00000014;
    padding: 13px 30px;
    height: 40px;
    white-space: nowrap;
  }
}
</style>
