import { createRouter, createWebHistory } from "vue-router";
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

//create a variable that holds a 0 or 1 for the admin role (admin = 1, user = 0)
//this needs to change to a function that checks the user role in the future
const isAdmin = 1;
//lets get a variable that holds if the user is logged in or not (logged in = 1, not logged in = 0)
//this needs to change to a function that checks the user login state in the future
const isLoggedIn = 1;

const routes = [
    {
        path: '/login',
        component: () => {
          if (isLoggedIn) {
            // If the user is logged in, move to home page
            router.push('/');
          } else {
            // If the user is not logged in, return the login page
            return Login;
          }
        },
    },
    {
        path: '/signup',
        component: () => {
          if (isLoggedIn) {
            // If the user is logged in, move to home page
            router.push('/');
          } else {
            // If the user is not logged in, return the signup page
            return Signup;
          }
        },
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
            router.push('/login');
          }
        },
    },
    {
        path: '/order',
        component: () => {
            if (isLoggedIn) {
                if (isAdmin) {
                    return AdminOrder;
                } else { 
                    return UserOrder;
                }
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/profile',
        component: () => {
            if (isLoggedIn) {
                if (isAdmin) {
                    return AdminProfile;
                } else { 
                    return UserProfile;
                }
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/create',
        component: () => {
            if (isLoggedIn) {
                if (isAdmin) {
                    router.push('/');
                } else { 
                    return ShoeCreator;
                }
            } else {
                router.push('/login');
            }
        },
    },
    //prevent manual navigation to the confirm page (STILL NEEDS TO BE ADDED)
    //mensen mogen hier niet uitkomen vanuit hun browser als ze er manueel naar browsen
    //kunnen dit misschien op de pagina zelf doen met een if statement
    {
        path: '/confirm',
        component: () => {
            if (isLoggedIn) {
                if (isAdmin) {
                    router.push('/');
                } else { 
                    return OrderPlaced;
                }
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/confirmed',
        component: () => {
            if (isLoggedIn) {
                if (isAdmin) {
                    router.push('/');
                } else { 
                    return OrderConfirmed;
                }
            } else {
                router.push('/login');
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;