<script setup>
import Logo from "../general/Logo.vue";
import { ref, onMounted, watch } from "vue";
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
            throw new Error(`Failed to fetch order details: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        order.value = data.data.shoe;
        
    } catch (error) {
        console.error('Error fetching order details:', error.message);
    }
});

const updateOrderStatus = async (order) => {
    if (order.status === "Order Received"){
        try {
        const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/payment/${orderId.value}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'Order Accepted',
            }),
        })
        .then((response) => response.json())
        .then((data) => {
                console.log('Order placed successfully:', data);
                console.log(data.data._id);
                window.location.href =`/confirmed/${order._id}`;
        });

        if (!response.ok) {
            throw new Error(`Failed to update order status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data);

        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    } else {
        window.location.href =`/confirmed/${orderId.value}`;
    }
};

//Wanneer je weggaat van de pagina moet de user een melding krijgen dat hij zijn schoen niet heeft opgeslagen
const openPopup = () => {
    document.querySelector(".popup").classList.add("open__popup");
}

//popup sluiten wanneer er op de popup background wordt geklikt
const closePopup = () => {
    document.querySelector(".popup").classList.remove("open__popup");
}
</script>

<template>
    <header>
        <Logo />
        <nav class="nav--one-button">
            <a href="/profile" class="button__header">Profile</a>
        </nav>
    </header>
    <main v-if="order" class="confirm">
        <div class="main__content confirm__content">
            <div class="order__head">
                <h1 class="confirm__title">We received your order</h1>
                <a class="order__close order__close--confirm" href="#" @click="openPopup"></a>
            </div>
            <div class="confirm__order">
                <div class="order__snapshot confirm__order__snapshot">
                    <img :src="order.snapshot" alt="Order Snapshot">
                </div>
                <div class="order__data confirm__order__data">
                    <h2 class="customer">Order for: <span>{{ order.user.first_name }} {{ order.user.last_name }}</span></h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order._id }}</p>
                    <div class="order__adress__box">
                        <p><span>Adress:</span><br><br><br></p>
                        <p class="order__adress confirm__order__adress" >{{ order.user.adress }} <br> {{ order.user.city }} <br> {{ order.user.country }}</p>
                    </div>
                    <p class="order__status"><span>Status:</span> {{ order.status }}</p>
                    <div class="order__payment">
                        <h2>Select your payment method</h2>
                        <div class="order__payment__options">
                            <a class="order__payment__method" href=# @click="updateOrderStatus(order)">Paypal</a>
                            <a class="order__payment__method" href=# @click="updateOrderStatus(order)">Apple Pay</a>
                            <a class="order__payment__method" href=# @click="updateOrderStatus(order)">Bancontact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div class="loading__state" v-else>
        <p>Placing order..</p>
    </div>
    <div class="popup close__popup">
        <div class="popup__background" @click="closePopup"></div>
        <div class="popup__content">
            <h2 class="popup__title close__popup__title">Are you sure you want to close this screen?</h2>
            <p class="popup__text close__popup__text">You will lose all progress on the order</p>
            <div class="popup__options close__popup__options">
                <a class="popup__option btn btn--positive" href="/">Yes</a>
                <a class="popup__option btn btn--negative" href="#" @click="closePopup">No</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order__payment {
    margin-top: 10px;
}

.order__payment__options {
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 16px;
    margin-left: 20px;
    margin-bottom: 16px;
}

.order__payment__method {
    width: 30%;
    height: 40px;
    padding: 8px 16px;
    margin-top: 16px;
    margin-left: 2px;
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

.order__payment__method:hover {
    background-color: #69ff47;
    color: #FFF;
}

.order__payment__method:hover {
    background-color: #69FF47;
    color: #FFF;
}

@media screen and (max-width: 600px) {
    .order__payment__options {
        width: 100%;
        margin-left: 0;
    }
}
</style>