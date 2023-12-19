import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/general/Login.vue';
import Signup from './components/general/Signup.vue';
import AdminHome from './components/admin/AdminHome.vue';
import UserHome from './components/user/UserHome.vue';
import AdminOrder from './components/admin/AdminOrder.vue';
import UserOrder from './components/user/UserOrder.vue';
import AdminProfile from './components/admin/AdminProfile.vue';
import UserProfile from './components/user/UserProfile.vue';
import ShoeCreator from './components/user/ShoeCreator.vue';
import OrderPlaced from './components/user/OrderPlaced.vue';
import OrderConfirmed from './components/user/OrderConfirmed.vue';

const checkAdmin = async () => {
  try {
    const response = await fetch(
      `https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/check-admin/${localStorage.getItem("token")}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    return data?.data?.admin === true;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return false;
  }
};

const isLoggedIn = () => localStorage.getItem("token");

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        {
            path: '/',
            component: () => {
            return new Promise((resolve) => {
                if (isLoggedIn()) {
                const component = checkAdmin() ? AdminHome : UserHome;
                resolve(component);
                } else {
                resolve(Login);
                }
            });
            },
        },
        {
            path: '/order/:orderId',
            name: 'order',
            component: () => {
            if (isLoggedIn()) {
                return checkAdmin() ? AdminOrder : UserOrder;
            } else {
                return Login;
            }
            },
        },
        {
        path: '/profile',
        component: () => {
            if (isLoggedIn()) {
            return checkAdmin() ? AdminProfile : UserProfile;
            } else {
            return Login;
            }
        },
        },
        {
        path: '/create',
        component: () => {
            if (isLoggedIn()) {
            return checkAdmin() ? UserHome : ShoeCreator;
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
            return checkAdmin() ? UserHome : OrderPlaced;
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
            return checkAdmin() ? UserHome : OrderConfirmed;
            } else {
            return Login;
            }
        },
        },
  ],
});

export default router;