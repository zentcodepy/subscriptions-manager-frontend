import { createRouter, createWebHistory } from 'vue-router';
import CustomerList from './pages/Customers/CustomerList.vue';
import CustomerForm from './pages/Customers/CustomerForm.vue';
import Dashboard from './components/Dashboard.vue';
import Login from './components/Login.vue';
import Subscriptions from './pages/Subscriptions/List.vue';
import SubscriptionCreateForm from './pages/Subscriptions/SubscriptionCreateForm.vue';
import SubscriptionEditForm from './pages/Subscriptions/SubscriptionEditForm.vue';
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
    component: CustomerList,
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
  },
  {
    path: '/subscriptions/:subscriptionId/edit',
    component: SubscriptionEditForm,
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
