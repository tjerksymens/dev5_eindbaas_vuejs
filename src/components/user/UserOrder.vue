<script setup>
import Logo from "../general/Logo.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const orderId = ref(route.params.orderId);
const order = ref(null);


onMounted(async () => {
    try {
        const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/${orderId.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        order.value = data.data.shoe;

        // Log order.value after setting its value
        console.log(order.value);
        
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
});
</script>

<template>
    <header>
        <Logo />
        <nav>
            <a href="/create" class="button__header">Create</a>
            <a href="/profile" class="button__header">Profile</a> 
        </nav>
    </header>
    <div v-if="order">
        <main class="confirmed">
        <div class="main__content confirmed__content">
            <div class="order__head">
                <h1 class="confirmed__title">Order information</h1>
                <a class="order__close" href="/"></a>
            </div>
            <div class="confirmed__order">
                <div class="order__snapshot confirmed__order__snapshot"></div>
                <div class="order__data confirmed__order__data">
                    <h2 class="customer">Order for <span> {{ order.user.first_name }} {{ order.user.last_name }}</span></h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order._id }} </p>
                    <div class="order__adress__box">
                        <p><span>Address:</span><br><br><br></p>
                        <p class="order__address confirm__order__address">
                            {{ order.user.adress }} <br>
                            {{ order.user.city}} <br>
                            {{ order.user.country }}
                        </p>
                    </div>
                    <p class="order__status"><span>Status: </span>{{ order.status }}</p>
                </div>
            </div>
        </div>
    </main>
    </div>
    <div class="loading__state" v-else>
        <p>Loading..</p>
    </div>
</template>
<style scoped>

</style>