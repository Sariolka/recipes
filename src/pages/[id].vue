<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import { pushTo404 } from '@/helpers/pushTo404.ts';
import { getCurrentRecipe, loadSavedRecipes, saveNotes } from '@/api/api.ts';
import type { CardType, INote, Recipe } from '@/types/types.ts';
import { useAuthStore } from '@/stores/auth.ts';
import SymbolComponent from '@/components/SymbolComponent.vue';
import PreloaderComponent from '@/components/PreloaderComponent.vue';
import NotesList from '@/components/NotesList.vue';

const store = useAuthStore();
const route = useRoute();
const recipe = ref<Recipe>();
const isLoading = ref(true);
const state = reactive({
  savedRecipes: [] as CardType[]
});
const isNotesOpen = ref(false);
const isSaved = ref(false);
const notes = ref<INote[]>([]);
const foundRecipe = ref<CardType>();
const isInProcess = ref(false);
const isInputActive = ref<string | null>(null);

const loadRecipe = async () => {
  const recipeId = Number(route.params.id);
  if (store.user) {
    state.savedRecipes = await loadSavedRecipes();
  }
  if (isNaN(recipeId) || recipeId <= 0) {
    console.error('Произошла ошибка');
    pushTo404();
    return;
  }
  try {
    recipe.value = await getCurrentRecipe(recipeId);
    if (recipe.value) {
      // @ts-expect-error @typescript-eslint/ban-ts-comment
      isSaved.value = !!state.savedRecipes.find((i) => Number(i.id) === recipe.value.id);
      foundRecipe.value = state.savedRecipes.find((i) => {
        return recipe.value && Number(i.id) === recipe.value.id;
      });
      notes.value = foundRecipe.value ? foundRecipe.value.notes : [];
    }
  } catch (error) {
    console.error(error);
    pushTo404();
  } finally {
    isLoading.value = false;
  }
};

loadRecipe();

const nutritionData = computed(() => {
  if (recipe.value) {
    return {
      Calories: recipe.value.nutrition.calories,
      Fat: recipe.value.nutrition.fat,
      Carbs: recipe.value.nutrition.carbohydrates,
      Sugar: recipe.value.nutrition.sugar,
      Fiber: recipe.value.nutrition.fiber,
      Protein: recipe.value.nutrition.protein
    };
  }
  return {};
});

const ingredients = computed(() => {
  if (recipe.value) {
    return recipe.value.sections[0].components.map((item) => item.raw_text);
  }
  return null;
});

const instructions = computed(() => {
  if (recipe.value) {
    return recipe.value.instructions.map((item) => item.display_text);
  }
  return null;
});

const ratingInPercent = computed(() => {
  if (recipe.value && recipe.value.user_ratings) {
    return Math.round(recipe.value.user_ratings.score * 100);
  }
  return 0;
});

const handleOpenNotes = () => {
  isNotesOpen.value = !isNotesOpen.value;
};

const handleAddNewNote = () => {
  if (foundRecipe.value) {
    const newNote = {
      text: '',
      id: uuidv4(),
      recipeId: foundRecipe.value.id
    };
    notes.value.push(newNote);
    isNotesOpen.value = true;
    isInputActive.value = newNote.id;
  }
};

const handleEditNote = async (note: INote) => {
  if (isInProcess.value) return;
  if (foundRecipe.value) {
    try {
      isInProcess.value = true;
      if (isInputActive.value === note.id) {
        const index = notes.value.findIndex((item) => item.id === note.id);
        if (index !== -1) {
          if (note.text.length) {
            const updatedNotes = [...notes.value];
            updatedNotes[index] = { ...updatedNotes[index], text: note.text };
            await saveNotes(updatedNotes, foundRecipe.value.id);
            notes.value[index].text = note.text;
          } else {
            await handleDeleteNote(note.id);
          }
          isInputActive.value = null;
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      isInProcess.value = false;
    }
  }
};

const handleActivateInput = (id: string) => {
  isInputActive.value = id;
};

const handleDeleteNote = async (id: string) => {
  if (isInProcess.value) return;
  try {
    isInProcess.value = true;
    const currentNotes = notes.value.filter((item) => item.id !== id);
    const updatedNotes = [...currentNotes];
    await saveNotes(updatedNotes, foundRecipe.value.id);
    notes.value = currentNotes;
  } catch (e) {
    console.error(e);
  } finally {
    isInProcess.value = false;
  }
};
</script>

<template>
  <section class="recipe-page" :class="{ 'recipe-page_loading': isLoading }">
    <PreloaderComponent v-if="isLoading" />
    <article class="recipe-page__article" v-else-if="recipe && !isLoading">
      <div class="recipe-page__header">
        <div
          class="recipe-page__img"
          :style="{ backgroundImage: 'url(' + recipe.thumbnail_url + ')' }"
        >
          <div class="recipe-page__rating">
            <div class="recipe-page__hand" :class="{ 'recipe-page__hand_fill': isSaved }"></div>
            {{ ratingInPercent }}% like it!
          </div>
        </div>
        <div class="recipe-page__header-side">
          <h1 class="recipe-page__title">{{ recipe.name }}</h1>
          <div class="recipe-page__cooking-time" v-if="recipe.cook_time_minutes">
            <div class="recipe-page__icon"></div>
            {{ recipe.total_time_minutes }} minutes
          </div>
          <h2 class="recipe-page__subtitle">
            <strong>Ingredients</strong> for {{ recipe.num_servings }}
            {{ recipe.num_servings > 1 ? 'servings' : 'serving' }}
          </h2>
          <ul class="recipe-page__list recipe-page__list_type-ingredients">
            <li class="recipe-page__item" v-for="(value, key) in ingredients" :key="key">
              {{ value }}
            </li>
          </ul>
        </div>
        <div class="recipe-page__body">
          <ul class="recipe-page__nut">
            <li class="recipe-page__li" v-for="(value, key) in nutritionData" :key="key">
              <div class="recipe-page__nutrition-title">{{ key }}</div>
              <div class="recipe-page__nutrition">
                {{ value }}{{ key === 'Calories' ? 'kcal' : 'g' }}
              </div>
            </li>
          </ul>
          <p class="recipe-page__description" v-if="recipe.description">{{ recipe.description }}</p>
        </div>
      </div>
      <div class="recipe-page__notes" v-if="isSaved">
        <div class="recipe-page__control">
          <button
            class="recipe-page__button recipe-page__button_type-add-note"
            :class="{ 'recipe-page__button_type-add-note_disabled': notes.length > 9 }"
            aria-label="Add note"
            @click="handleAddNewNote"
          ></button>
          <p class="recipe-page__add-text" v-if="notes.length === 0">Add your first note!</p>
          <button
            class="recipe-page__button recipe-page__button_type-open"
            :class="{ 'recipe-page__button_type-open_rotate': isNotesOpen }"
            @click="handleOpenNotes"
            aria-label="Open notes"
            v-if="notes.length !== 0"
          ></button>
        </div>
        <NotesList
          :notes="notes"
          v-if="notes && isNotesOpen"
          @open="handleActivateInput"
          :isInputActive="isInputActive"
          @delete="handleDeleteNote"
          @edit="handleEditNote"
        />
      </div>
      <div class="recipe-page__preparation">
        <div>
          <h2 class="recipe-page__subtitle">Preparation</h2>
          <ul class="recipe-page__list recipe-page__list_type-prep">
            <li
              class="recipe-page__item recipe-page__item_type-prep"
              v-for="(value, key) in instructions"
              :key="key"
            >
              <SymbolComponent :index="key + 1" />
              <p class="recipe-page__item-text">
                {{ value }}
              </p>
            </li>
          </ul>
        </div>
        <iframe
          v-if="recipe && recipe.original_video_url"
          allowfullscreen
          title="Video recipe"
          width="400"
          height="400"
          :src="recipe?.original_video_url"
          class="recipe-page__video"
        >
        </iframe>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.recipe-page {
  display: flex;
  flex-direction: column;
  background-image: url('@/icons/rosemary.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;
  position: relative;
  z-index: 0;
  height: auto;
  flex-grow: 1;

  &_loading {
    align-items: center;
    justify-content: center;
  }

  &__article {
    margin: 50px;

    @media screen and (max-width: 1023px) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 5px 20px;
    margin-bottom: 40px;

    @media screen and (max-width: 1023px) {
      grid-template-columns: 1fr;
    }
  }

  &__nut {
    display: flex;
    align-items: center;
    gap: 7px;
    width: 100%;
    margin-bottom: 40px;
  }

  &__li {
    display: flex;
    flex-direction: column;
    gap: 7px;
    justify-content: center;
    align-items: center;
    background-color: #ebf0e4;
    flex-grow: 1;
  }

  &__body {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1023px) {
      margin-top: 10px;
    }
  }

  &__title {
    font-family: 'Rufina', sans-serif;
    font-size: 48px;
    line-height: 64px;
    color: #000;
    font-weight: 700;
    font-style: normal;
    border-bottom: 4px dotted #4d4d4d;
    margin-bottom: 10px;

    @media screen and (max-width: 1280px) {
      font-size: 38px;
      line-height: normal;
    }
  }

  &__hand {
    background-image: url('@/icons/hand.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 20px;
    height: 20px;

    &_fill {
      background-image: url('@/icons/hand-fill.svg');
    }
  }

  &__img {
    width: auto;
    height: auto;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #fff;
    position: relative;
  }

  &__cooking-time {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 18px;
    line-height: normal;
    color: #4d4d4d;
    font-weight: 400;
  }

  &__icon {
    background-image: url('@/icons/clock.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
  }

  &__subtitle {
    font-family: 'Rufina', sans-serif;
    font-size: 32px;
    line-height: 48px;
    color: #000;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 10px;

    &_type-nutrition {
      font-size: 25px;
      line-height: normal;
    }

    @media screen and (max-width: 1280px) {
      font-size: 26px;
      line-height: normal;
    }

    @media screen and (max-width: 1023px) {
      margin-top: 20px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &_type-prep {
      padding-left: 25px;
      gap: 20px;

      @media screen and (max-width: 1023px) {
        padding-left: 15px;
      }
    }

    &_type-ingredients {
      list-style: disc;
      padding-left: 25px;
    }
  }

  &__item-text {
    margin-top: 5px;
  }

  &__item {
    font-size: 22px;
    line-height: normal;
    color: #000;
    font-weight: 400;
    letter-spacing: 0.48px;

    @media screen and (max-width: 1280px) {
      font-size: 20px;
    }

    &_type-prep {
      display: flex;
      gap: 30px;
      font-size: 24px;
      line-height: 33.6px;

      @media screen and (max-width: 1280px) {
        font-size: 22px;
      }
    }

    &_type-nutritions {
      display: flex;
      align-items: center;
      gap: 15px;
      justify-content: space-between;
    }
  }

  &__rating {
    position: absolute;
    top: 5px;
    right: 5px;
    align-items: center;
    gap: 10px;
    background-color: #5e6600;
    box-shadow: 1px 1px 12px 0 #00000014;
    padding: 10px 30px;
    display: flex;
    font-size: 18px;
    line-height: normal;
    color: #fff;
    font-weight: 700;
  }

  &__description {
    font-size: 22px;
    line-height: normal;
    color: #4d4d4d;
    font-weight: 400;
  }

  &__preparation {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 100px;

    @media screen and (max-width: 1023px) {
      grid-template-columns: 1fr;
    }
  }

  &__video {
    margin-top: 60px;

    @media screen and (max-width: 1023px) {
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__header-side {
    @media screen and (max-width: 1023px) {
      padding-bottom: 10px;
      border-bottom: 4px dotted #4d4d4d;
    }
  }

  &__notes {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }

  &__control {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__button {
    width: 25px;
    height: 25px;
    background-color: transparent;
    border: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &_type-add-note {
      background-image: url('@/icons/plus.svg');

      &_disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }

    &_type-open {
      background-image: url('@/icons/arrow.svg');
      transition: transform 0.3s ease-in-out;

      &_rotate {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
