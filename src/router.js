import { createRouter, createWebHistory } from "vue-router";
import Login from './components/general/Login.vue';
import AdminHome from './components/admin/AdminHome.vue';
import UserHome from './components/user/UserHome.vue';

//create a variable that holds a 0 or 1 for the admin role (admin = 1, user = 0)
//this needs to change to a function that checks the user role in the future
const isAdmin = 0;
//lets get a variable that holds if the user is logged in
//this needs to change to a function that checks the user login state in the future
const isLoggedIn = 1;

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: () => {
          if (isLoggedIn) {
            // If the user is logged in, check if the user is an admin
            if (isAdmin) {
                return AdminHome;
                } else { 
            // If the user is not an admin, return the user home page
                return UserHome;
                }
          } else {
            // If the user is not logged in, return the login page
            return Login;
          }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;