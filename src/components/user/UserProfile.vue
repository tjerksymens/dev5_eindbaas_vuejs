<script setup>
import Logo from "../general/Logo.vue";
import { ref, watchEffect } from "vue";

//twee variabelen voor de naam van de user
//deze worden geupdate naar de api value via de login
let firstName = "Joe";
let lastName = "Jackson";

const orders = ref([
    {
        orderId: 5002,
        shoeId: 1891,
        status: 3
    },
    {
        orderId: 2005,
        shoeId: 2345,
        status: 5
    },
    {
        orderId: 3569,
        shoeId: 1234,
        status: 2
    },
    {
        orderId: 1001,
        shoeId: 5678,
        status: 1
    },
    {
        orderId: 4003,
        shoeId: 3456,
        status: 4
    }
]);

// Create a computed property to return a sorted copy of the orders array
//orders worden geordend op status value
//zo komen de nieuwste orders bovenaan te staan
const sortedOrders = ref([]);

// Watch for changes in the original orders array and update the sortedOrders
watchEffect(() => {
  sortedOrders.value = [...orders.value].sort((a, b) => a.status - b.status);
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
                                <p class="order__id"><span>Order ID:</span> {{ order.orderId }}</p>
                                <p class="order__shoe"><span>Shoe ID:</span> {{ order.shoeId }}</p>
                                <p class="order__buyer"><span>Customer:</span> {{ firstName }} {{ lastName }}</p>
                            </div>
                            <p v-if="order.status === 1" class="order__status order__status--accepted">Order accepted✉️</p>
                            <p v-else-if="order.status === 2" class="order__status order__status--production">In production🏭</p>
                            <p v-else-if="order.status === 3" class="order__status order__status--preparing">Preparing order🎁</p>
                            <p v-else-if="order.status === 4" class="order__status order__status--delivering">Order send🚚</p>
                            <p v-else-if="order.status === 5" class="order__status order__status--arrived">Order arrived✅</p>
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