import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/pages/MainPage.vue';
import FavouritesPage from '@/components/pages/FavouritesPage.vue';
import ErrorPage from '@/components/pages/ErrorPage.vue';

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
      component: FavouritesPage
    },
    { path: '/404', component: ErrorPage },
    { path: '/:pathMatch(.*)*', redirect: '/404' }
  ]
});

export default router;
