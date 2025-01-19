import type { CardType } from '@/components/types/types.ts';

//Сохранение в локальном хранилище
export const saveRecipesToLocalStorage = (recipes: CardType[]) => {
  localStorage.setItem('savedRecipes', JSON.stringify(recipes));
};

//Загрузка из локального хранилища
export const loadSavedRecipes = () => {
  const saved = localStorage.getItem('savedRecipes');
  return saved ? JSON.parse(saved) : [];
};
