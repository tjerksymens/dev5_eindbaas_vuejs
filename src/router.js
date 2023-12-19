import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/general/Login.vue';
import Signup from './components/general/Signup.vue';
import Home from './components/pages/Home.vue';
import Order from './components/pages/Order.vue';
import Profile from './components/pages/Profile.vue';
import ShoeCreator from './components/user/ShoeCreator.vue';
import OrderPlaced from './components/user/OrderPlaced.vue';
import OrderConfirmed from './components/user/OrderConfirmed.vue';

const isLoggedIn = () => localStorage.getItem("token");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('./components/general/Login.vue') },
    { path: '/signup', component: () => import('./components/general/Signup.vue') },
    {
      path: '/',
      name: 'home',
      component: () => {
        if (isLoggedIn()) {
          return import('./components/pages/Home.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
    },
    {
      path: '/order/:orderId',
      name: 'order',
      component: () => {
        if (isLoggedIn()) {
          return import('./components/pages/Order.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
    },
    {
      path: '/profile',
      component: () => {
        if (isLoggedIn()) {
          return import('./components/pages/Profile.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
    },
    {
      path: '/create',
      component: () => {
        if (isLoggedIn()) {
          return import('./components/user/ShoeCreator.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
    },
    {
      path: '/confirm/:orderId',
      name: 'confirm',
      component: () => {
        if (isLoggedIn()) {
          return import('./components/user/OrderPlaced.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
    },
    {
      path: '/confirmed/:orderId',
      name: 'confirmed',
      component: () => {
        if (isLoggedIn()) {
          return import('./components/user/OrderConfirmed.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
    },
  ],
});

export default router;