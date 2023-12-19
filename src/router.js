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

// Function to check if the user is an admin
async function checkAdmin() {
    try {
        const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/check-admin/${localStorage.getItem("token")}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        if (data && data.data.admin === true) {
            console.log('User is an admin');
            return true;
        } else {
            console.log('User is not an admin');
            return false;
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        return false;
    }
}

// Check if the user is logged in
const isLoggedIn = localStorage.getItem("token");

// Check if the user is an admin
const isAdmin = isLoggedIn ? await checkAdmin() : false;

// Create the routes based on the user's status
const routes = [
    {
        path: '/login',
        component: () => (isLoggedIn ? router.push('/') : Login),
    },
    {
        path: '/signup',
        component: () => (isLoggedIn ? router.push('/') : Signup),
    },
    {
        path: '/',
        component: async () => {
            if (isLoggedIn) {
                if (isAdmin) {
                    return await import('./components/admin/AdminHome.vue');
                } else {
                    return await import('./components/user/UserHome.vue');
                }
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/order/:orderId',
        name: 'order',
        component: () => {
            if (isLoggedIn) {
                return isAdmin ? AdminOrder : UserOrder;
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/profile',
        component: () => {
            if (isLoggedIn) {
                return isAdmin ? AdminProfile : UserProfile;
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/create',
        component: () => {
            if (isLoggedIn) {
                return isAdmin ? router.push('/') : ShoeCreator;
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/confirm/:orderId',
        name: 'confirm',
        component: () => {
            if (isLoggedIn) {
                return isAdmin ? router.push('/') : OrderPlaced;
            } else {
                router.push('/login');
            }
        },
    },
    {
        path: '/confirmed/:orderId',
        name: 'confirmed',
        component: () => {
            if (isLoggedIn) {
                return isAdmin ? router.push('/') : OrderConfirmed;
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