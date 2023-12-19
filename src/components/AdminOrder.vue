<script setup>
import Logo from "./Logo.vue";
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

const updateOrderStatus = async (order) => {
        try {
            const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/${orderId.value}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    status: order.status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const data = await response.json();
            console.log(data.data);

        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

const cancelOrder = async (order) =>{
        try {
            const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/${orderId.value}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }

            const data = await response.json();
            console.log(data.data);
            window.location.href = "/login";

        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

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
                <div class="order__snapshot confirmed__order__snapshot">
                    <img :src="order.snapshot" alt="Order Snapshot">
                </div>
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
                    <div class="order__options">
                            <select id="status__select" name="status select" v-model="order.status" @change="updateOrderStatus(order)">
                                <option value="Order Received" class="status__select__option status__select--status0" :selected="order.status === 'Order Received'" >Order Received</option>
                                <option value="Order Accepted" class="status__select__option status__select--status1" :selected="order.status === 'Order Accepted'" >Order Accepted</option>
                                <option value="In Production" class="status__select__option status__select--status2" :selected="order.status === 'In Production'" >In Production</option>
                                <option value="Preparing Order" class="status__select__option status__select--status3" :selected="order.status === 'Preparing Order'" >Preparing Order</option>
                                <option value="Order Send" class="status__select__option status__select--status4" :selected="order.status === 'Order Send'" >Order Send</option>
                                <option value="Order Arrived" class="status__select__option status__select--status5" :selected="order.status === 'Order Arrived'" >Order Arrived</option>
                            </select>
                            <button @click="cancelOrder(order)">Cancel Order</button>
                        </div>
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
 .order__options__id select {
    width: 80%;
    margin-left: 20px;
    margin-top: 8px;
 }
</style>