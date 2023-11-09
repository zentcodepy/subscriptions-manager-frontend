import { createRouter, createWebHistory } from 'vue-router';
import Customers from './pages/Customers/List.vue';
import CustomerForm from './pages/Customers/CustomerForm.vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import ServiceList from './pages/Services/ServiceList.vue';
import ServiceCreateForm from './pages/Services/ServiceCreateForm.vue';

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
    path: '/services',
    component: ServiceList,
  },
  {
    path: '/services/create',
    component: ServiceCreateForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;
