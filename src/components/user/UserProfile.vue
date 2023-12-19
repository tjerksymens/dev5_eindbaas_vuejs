<script setup>
import Logo from "../general/Logo.vue";
import { ref, watchEffect, onMounted } from "vue";


const firstName = ref('');
const lastName = ref('');
const username = ref('');
const orders = ref([]);
const sortedOrders = ref([]);

// Fetch user data
onMounted(async () => {
        try {
            const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/${localStorage.getItem("token")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const responseData = await response.json();
            
            if (responseData.data && responseData.data.user) {
                const user = responseData.data.user;
                //so code works untill here, but the user.first_name doesn't work in the if statement anymore
                if (user.first_name && user.last_name && user.username) {
                    firstName.value = user.first_name;
                    lastName.value = user.last_name;
                    username.value = user.username;
                } else {
                    console.error('Invalid user data:', user);
                }
                return firstName, lastName;
            } else {
                console.error('Invalid API response:', responseData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    });

    const fetchOrdersByUser = async () => {
        try {
            const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            orders.value = data.data.filter(order => order.user.username === username.value);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    console.log(firstName, lastName)

    onMounted(fetchOrdersByUser);

    // Watch for changes in the original orders array and update the sortedOrders
    watchEffect(() => {
        console.log('Orders changed:', orders.value);
        sortedOrders.value = orders.value.slice().sort((a, b) => {
            return b.status - a.status;
        });
    });

    //Wanneer je wil uitloggen opent de popup
    const openPopup = () => {
        document.querySelector(".popup").classList.add("open__popup");
    }

    //popup sluiten wanneer er op de popup background wordt geklikt of op close
    const closePopup = () => {
        document.querySelector(".popup").classList.remove("open__popup");
    }

    //logout the user by destroying the token and redirecting to /login
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
</script>

<template>
    <header>
        <Logo />
        <nav>
            <a href="/" class="button__header">Home</a>
            <a href="/create" class="button__header">Create</a>
        </nav>
    </header>
    <main class="profile profile--user">
        <div class="main__content profile__content--user">
            <h1 class="profile__name--user">Hey there, {{ firstName }} {{ lastName }}</h1>
            <div class="profile__orders--user">
                <h2>Your Orders</h2>
                <ul class="order__list order__list--user">
                    <li class="order home__order home__order--user" v-for="order in sortedOrders" :key="order.orderId">
                        <router-link :to="{ name: 'order', params: { orderId: order._id } }" class="order__box profile__order__box">
                            <div class="order__snapshot">
                            <img :src="order.snapshot" alt="Order Snapshot">
                            </div>
                            <div class="order__data">
                                <p class="order__id"><span>Order ID:</span> {{ order._id }}</p>
                                <p class="order__shoe"><span>Shoe ID:</span> {{ order.name }}</p>
                                <p class="order__buyer"><span>Customer:</span> {{ order.user.first_name }} {{ order.user.last_name }} </p>
                                <p><span>Order Status:</span> {{ order.status }}</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="logout profile__logout">
            <h2 class="logout__title">Profile settings</h2>
            <button @click="openPopup" class="logout__btn">Logout</button>
        </div>
    </main>
    <div class="popup logout__popup">
        <div class="popup__background" @click="closePopup"></div>
        <div class="popup__content">
            <h2 class="popup__title close__popup__title">Are you sure you want to logout?</h2>
            <p class="popup__text close__popup__text">You will have to log back in</p>
            <div class="popup__options close__popup__options">
                <a class="popup__option btn btn--positive" href="#" @click="handleLogout">Yes</a>
                <a class="popup__option btn btn--negative" href="#" @click="closePopup">No</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile--user {
    display: grid;
    grid-template-columns: 5fr 1fr;
    overflow-y: hidden;
}

.profile__name--user {
    margin-top: 20px;
}

.profile__orders--user {
    width: 80%;
    margin-left: 6%;
    margin-top: 20px;
}

.order__list--user {
    height: calc(100vh - 250px);
}

.profile__order__box {
    width: calc(100% - 40px);
}

.profile__logout {
    height: calc(100% - 240px);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile__logout h2 {
    margin: 0;
}

@media screen and (max-width: 1300px) {
    .profile__logout {
        align-items: baseline;
    }
}

@media screen and (max-width: 900px) {
    .profile--user {
    display: grid;
    grid-template-columns: 4fr 1fr;
    }

    .order__list--user {
        width: 140%;
    }

    .logout__title {
        display: none;
    }
}
</style>