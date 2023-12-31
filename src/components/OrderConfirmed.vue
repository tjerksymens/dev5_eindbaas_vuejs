<script setup>
import Logo from "./Logo.vue"
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
    <main v-if="order" class="confirmed">
        <div class="main__content confirmed__content">
            <div class="order__head">
                <h1 class="confirmed__title">Payment succesfull</h1>
                <a class="order__close order__close--confirmed" href="/profile"></a>
            </div>
            <div class="confirmed__order">
                <div class="order__snapshot confirmed__order__snapshot">
                    <img :src="order.snapshot" alt="Order Snapshot">
                </div>
                <div class="order__data confirmed__order__data">
                    <h2 class="customer">Order for <span>{{ order.user.first_name }} {{ order.user.last_name }}</span> accepted</h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order._id }}</p>
                    <div class="order__adress__box">
                        <p><span>Adress:</span><br><br><br></p>
                        <p class="order__adress confirm__order__adress" >{{ order.user.adress }} <br> {{ order.user.city }} <br> {{ order.user.country }}</p>
                    </div>
                    <p class="order__status order__status--accepted confirmed__order__status"><span>Status: </span>{{ order.status }}</p>
                    <div class="redirect__box">
                        <a class="confirmed__btn" href="/">Home</a>
                        <a class="confirmed__btn" href="/profile">Profile</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div class="loading__state" v-else>
        <p>Payment is being processed...</p>
    </div>
</template>

<style scoped>
.confirmed__btn {
    width: 30%;
    height: 40px;
    padding: 8px 16px;
    margin-top: 16px;
    margin-left: 2px;
    margin-bottom: 16px;
    border-radius: 4px;
    border: none;
    background-color: #4769FF;
    color: #FFF;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.confirmed__btn:hover {
    background-color: #69ff47;
    color: #FFF;
}

.redirect__box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-around;
}
</style>