import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Home from './pages/Home.vue';
import Order from './pages/Order.vue';
import Profile from './pages/Profile.vue';
import ShoeCreator from './components/ShoeCreator.vue';
import OrderPlaced from './components/OrderPlaced.vue';
import OrderConfirmed from './components/OrderConfirmed.vue';

const isLoggedIn = () => localStorage.getItem("token");

const requireAuth = (to, from, next) => {
  if (isLoggedIn()) {
    next();
  } else {
    next('/login');
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
<<<<<<< Updated upstream
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
=======
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth,
>>>>>>> Stashed changes
    },
    {
      path: '/order/:orderId',
      name: 'order',
<<<<<<< Updated upstream
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
=======
      component: Order,
      beforeEnter: requireAuth,
    },
    {
      path: '/profile',
      component: Profile,
      beforeEnter: requireAuth,
    },
    {
      path: '/create',
      component: ShoeCreator,
      beforeEnter: requireAuth,
>>>>>>> Stashed changes
    },
    {
      path: '/confirm/:orderId',
      name: 'confirm',
<<<<<<< Updated upstream
      component: () => {
        if (isLoggedIn()) {
          return import('./components/user/OrderPlaced.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
=======
      component: OrderPlaced,
      beforeEnter: requireAuth,
>>>>>>> Stashed changes
    },
    {
      path: '/confirmed/:orderId',
      name: 'confirmed',
<<<<<<< Updated upstream
      component: () => {
        if (isLoggedIn()) {
          return import('./components/user/OrderConfirmed.vue');
        } else {
          return import('./components/general/Login.vue');
        }
      },
=======
      component: OrderConfirmed,
      beforeEnter: requireAuth,
>>>>>>> Stashed changes
    },
  ],
});

export default router;
