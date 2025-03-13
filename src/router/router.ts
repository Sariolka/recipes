// import { createRouter, createWebHistory } from 'vue-router';
// import MainPage from '@/views/index.vue';
// import FavouritesPage from '@/views/favourites.vue';
// import ErrorPage from '@/views/[...path].vue';
// import { useAuthStore } from '@/stores/auth.ts';
// import RecipePage from '@/views/[id].vue';
//
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       name: 'Main',
//       component: MainPage
//     },
//     {
//       path: '/favourites',
//       name: 'Favourites',
//       component: FavouritesPage,
//       meta: { user: true }
//     },
//     {
//       path: '/:id',
//       name: 'RecipePage',
//       component: RecipePage
//     },
//     { path: '/404', component: ErrorPage },
//     { path: '/:pathMatch(.*)*', redirect: '/404' }
//   ]
// });
// router.beforeEach((to, from, next) => {
//   const store = useAuthStore();
//
//   if (to.meta.user && !store.user) {
//     return next({ path: '/' });
//   }
//   return next();
// });
//
// export default router;


import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
})
