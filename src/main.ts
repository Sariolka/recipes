import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router.ts';
import VueAwesomePaginate from 'vue-awesome-paginate';
import { createPinia } from 'pinia';
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueAwesomePaginate).mount('#app');
