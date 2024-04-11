import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import BookList from '../components/BookList.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    breadCrumbs: [],
  },
  {
    path: '/books',
    name: 'Books',
    component: BookList,
    breadCrumbs: ['/']
  },
  {
    path: '/about',
    name: 'About',
    component: () => AboutView,
    breadCrumbs: ['/']
  }
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
