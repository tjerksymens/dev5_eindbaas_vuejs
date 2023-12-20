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
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: requireAuth,
    },
    {
      path: '/order/:orderId',
      name: 'order',
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
    },
    {
      path: '/confirm/:orderId',
      name: 'confirm',
      component: OrderPlaced,
      beforeEnter: requireAuth,
    },
    {
      path: '/confirmed/:orderId',
      name: 'confirmed',
      component: OrderConfirmed,
      beforeEnter: requireAuth,
    },
  ],
});

export default router;
