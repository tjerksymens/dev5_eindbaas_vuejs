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
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        {
            path: '/',
            name: 'home',
            component: () => {
            if (isLoggedIn()) {
                return Home;
            } else {
                return Login;
            }
            },
        },
        {
            path: '/order/:orderId',
            name: 'order',
            component: () => {
            if (isLoggedIn()) {
                return Order;
            } else {
                return Login;
            }
            },
        },
        {
        path: '/profile',
        component: () => {
            if (isLoggedIn()) {
            return Profile;
            } else {
            return Login;
            }
        },
        },
        {
        path: '/create',
        component: () => {
            if (isLoggedIn()) {
            return ShoeCreator;
            } else {
            return Login;
            }
        },
        },
        {
        path: '/confirm/:orderId',
        name: 'confirm',
        component: () => {
            if (isLoggedIn()) {
            return OrderPlaced;
            } else {
            return Login;
            }
        },
        },
        {
        path: '/confirmed/:orderId',
        name: 'confirmed',
        component: () => {
            if (isLoggedIn()) {
            return OrderConfirmed;
            } else {
            return Login;
            }
        },
        },
  ],
});

export default router;