import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import FavouritesPage from '@/pages/FavouritesPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import { useAuthStore } from '@/stores/auth.ts';
import RecipePage from '@/pages/RecipePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/favourites',
      name: 'Favourites',
      component: FavouritesPage,
      meta: { user: true }
    },
    {
      path: '/:id',
      name: 'RecipePage',
      component: RecipePage
    },
    { path: '/404', component: ErrorPage },
    { path: '/:pathMatch(.*)*', redirect: '/404' }
  ]
});
router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.meta.user && !store.user) {
    return next({ path: '/' });
  }
  return next();
});

export default router;
