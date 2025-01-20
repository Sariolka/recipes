import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router.ts';
import VueAwesomePaginate from 'vue-awesome-paginate';

createApp(App).use(router).use(VueAwesomePaginate).mount('#app');
