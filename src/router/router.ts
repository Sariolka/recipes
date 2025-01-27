import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/Pages/MainPage.vue';
import FavouritesPage from '@/components/Pages/FavouritesPage.vue';
import ErrorPage from '@/components/Pages/ErrorPage.vue';
import { useAuthStore } from '@/components/Stores/auth.ts';

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
