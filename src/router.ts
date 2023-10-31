import { createRouter, createWebHistory } from 'vue-router';
import Customers from './pages/Customers/List.vue';
import CustomerForm from './pages/Customers/CustomerForm.vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import Subscriptions from './pages/Subscriptions/List.vue';
import SubscriptionCreateForm from './pages/Subscriptions/SubscriptionCreateForm.vue';

export const routes = [
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
  {
    path: '/customers/create',
    component: CustomerForm,
  },
  {
    path: '/customers/:customerId/edit',
    name: 'editCustomer',
    component: CustomerForm,
  },
  {
    path: '/subscriptions',
    component: Subscriptions,
  },
  {
    path: '/subscriptions/create',
    component: SubscriptionCreateForm,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;