import { createRouter, createWebHistory } from "vue-router";
import Login from './components/general/Login.vue';
import Signup from './components/general/Signup.vue';

const checkAdmin = async () => {
    try {
        const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/check-admin/${localStorage.getItem("token")}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        return data?.data?.admin === true;
    } catch (error) {
        console.error('Error fetching user information:', error);
        return false;
    }
}

const isLoggedIn = localStorage.getItem("token");
const isAdmin = isLoggedIn ? await checkAdmin() : false;

const routes = [
    {
        path: '/login',
        component: () => import('./components/general/Login.vue'),
    },
    {
        path: '/signup',
        component: () => import('./components/general/Signup.vue'),
    },
    {
        path: '/',
        component: () => {
            return new Promise(async (resolve) => {
                if (isLoggedIn) {
                    const component = isAdmin ? await import('./components/admin/AdminHome.vue') : await import('./components/user/UserHome.vue');
                    resolve(component);
                } else {
                    router.push('/login');
                    resolve({ template: '<div>An error has occured. Please contact us 😅</div>' });
                }
            });
        },
    },
    {
        path: '/order/:orderId',
        name: 'order',
        component: () => {
            return new Promise(async (resolve) => {
                if (isLoggedIn) {
                    const component = isAdmin ? await import('./components/admin/AdminOrder.vue') : await import('./components/user/UserOrder.vue');
                    resolve(component);
                } else {
                    router.push('/login');
                    resolve({ template: '<div>An error has occured. Please contact us 😅</div>' });
                }
            });
        },
    },
    {
        path: '/profile',
        component: () => {
            return new Promise(async (resolve) => {
                if (isLoggedIn) {
                    const component = isAdmin ? await import('./components/admin/AdminProfile.vue') : await import('./components/user/UserProfile.vue');
                    resolve(component);
                } else {
                    router.push('/login');
                    resolve({ template: '<div>An error has occured. Please contact us 😅</div>' });
                }
            });
        },
    },
    {
        path: '/create',
        component: () => {
            return new Promise(async (resolve) => {
                if (isLoggedIn) {
                    const component = isAdmin ? router.push('/') : await import('./components/user/ShoeCreator.vue');
                    resolve(component);
                } else {
                    router.push('/login');
                    resolve({ template: '<div>An error has occured. Please contact us 😅</div>' });
                }
            });
        },
    },
    {
        path: '/confirm/:orderId',
        name: 'confirm',
        component: () => {
            return new Promise(async (resolve) => {
                if (isLoggedIn) {
                    const component = isAdmin ? router.push('/') : await import('./components/user/OrderPlaced.vue');
                    resolve(component);
                } else {
                    router.push('/login');
                    resolve({ template: '<div>An error has occured. Please contact us 😅</div>' });
                }
            });
        },
    },
    {
        path: '/confirmed/:orderId',
        name: 'confirmed',
        component: () => {
            return new Promise(async (resolve) => {
                if (isLoggedIn) {
                    const component = isAdmin ? router.push('/') : await import('./components/user/OrderConfirmed.vue');
                    resolve(component);
                } else {
                    router.push('/login');
                    resolve({ template: '<div>An error has occured. Please contact us 😅</div>' });
                }
            });
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;