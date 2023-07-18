import { createRouter, createWebHistory } from 'vue-router';
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
        path: '/dashboard',
        component: Dashboard,
    },
  ],
})