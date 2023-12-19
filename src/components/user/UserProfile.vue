<script setup>
import Logo from "../general/Logo.vue";
import { ref, watchEffect, onMounted } from "vue";

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
                if (user.first_name && user.last_name) {
                    firstName = user.first_name;
                    lastName = user.last_name;
                } else {
                    console.error('Invalid user data:', user);
                }
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
            console.log(data.data);
            orders.value = data.data;

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    onMounted(fetchOrdersByUser);
    // Declare a reactive variable to store the orders
    const orders = ref([]);

    // Create a computed property to return a sorted copy of the orders array
    //orders worden geordend op status value
    //zo komen de nieuwste orders bovenaan te staan
    const sortedOrders = ref([]);

    // Watch for changes in the original orders array and update the sortedOrders
    watchEffect(() => {
        console.log('Orders changed:', orders.value);
        sortedOrders.value = orders.value.slice().sort((a, b) => {
            return b.status - a.status;
        });
    });
</script>

<template>
    <header>
        <Logo />
        <nav class="nav--one-button">
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
                        <a class="order__box" href="/order">
                            <div class="order__snapshot">Here comes the shoe snapshot</div>
                            <div class="order__data">
                                <p class="order__id"><span>Order ID:</span> {{ order._id }}</p>
                                <p class="order__shoe"><span>Shoe name:</span> {{ order.name }}</p>
                                <p class="order__buyer"><span>Customer:</span> {{ order.user.first_name }} {{ order.user.last_name }}</p>
                                <p><span>Order Status:</span> {{ order.status }}</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style scoped>
.profile__name--user {
    margin-top: 20px;
}

.profile__orders--user {
    width: 60%;
    margin-left: 6%;
    margin-top: 20px;
}

.order__list--user {
    height: calc(100vh - 250px);
}
</style>