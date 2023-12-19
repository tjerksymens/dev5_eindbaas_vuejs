import { createRouter, createWebHistory } from 'vue-router';

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

const isLoggedIn = localStorage.getItem("token");
const isAdmin = isLoggedIn ? await checkAdmin() : false;

const routes = [
  { path: '/login', component: () => import('./components/general/Login.vue') },
  { path: '/signup', component: () => import('./components/general/Signup.vue') },
  {
    path: '/',
    component: () => import(`./components/${isAdmin ? 'admin' : 'user'}/${isAdmin ? 'Admin' : 'User'}Home.vue`),
  },
  {
    path: '/order/:orderId',
    name: 'order',
    component: () => import(`./components/${isAdmin ? 'admin' : 'user'}/${isAdmin ? 'Admin' : 'User'}Order.vue`),
  },
  {
    path: '/profile',
    component: () => import(`./components/${isAdmin ? 'admin' : 'user'}/${isAdmin ? 'Admin' : 'User'}Profile.vue`),
  },
  {
    path: '/create',
    component: () => import(`./components/user/ShoeCreator.vue`),
    beforeEnter: (to, from, next) => {
        // Check if the user is an admin, redirect if they are
        if (isAdmin) {
          next('/');
        } else {
          next();
        }
      },
  },
  {
    path: '/confirm/:orderId',
    name: 'confirm',
    component: () => import('./components/user/OrderPlaced.vue'),
    beforeEnter: (to, from, next) => {
        // Check if the user is an admin, redirect if they are
        if (isAdmin) {
          next('/');
        } else {
          next();
        }
      },
  },
  {
    path: '/confirmed/:orderId',
    name: 'confirmed',
    component: () => import('./components/user/OrderConfirmed.vue'),
    beforeEnter: (to, from, next) => {
        // Check if the user is an admin, redirect if they are
        if (isAdmin) {
          next('/');
        } else {
          next();
        }
      },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;