import { createRouter, createWebHistory } from 'vue-router';
import Customers from './pages/Customers/List.vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Dashboard,
    },
    {
      path: '/customers',
      component: Customers,
    },
  ],
})