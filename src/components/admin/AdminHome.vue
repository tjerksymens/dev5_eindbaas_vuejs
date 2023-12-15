<script setup>
    import Logo from "../general/Logo.vue";
    import { ref, watchEffect } from "vue";

    //twee variabelen voor de naam van de admin
    //deze worden geupdate opgehaald uit de api
    let firstName = "Ben";
    let lastName = "Dover";

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

    function getStatusColor(status) {
        switch (status) {
            case 1:
            return '#4769FF'; // Change to the desired color for Order Received
            case 2:
            return '#DD49FF'; // Change to the desired color for In Production
            case 3:
            return '#DD49FF'; // Change to the desired color for Preparing Order
            case 4:
            return '#DD49FF'; // Change to the desired color for Order Send
            case 5:
            return '#23BD00'; // Change to the desired color for Order Arrived
            default:
            return 'white'; // Default color
        }
    }
</script>

<template>
    <header>
        <Logo />
        <nav class="nav--one-button">
            <a href="/profile" class="button__header">Profile</a>
        </nav>
    </header>
    <main class="home home--admin">
        <div class="main__content home__content--admin">
            <div class="home__orders--admin">
                <div class="home__orders__head">
                    <h2>Current Orders</h2>
                    <div class="home__searchbar">
                        <input type="text" placeholder="Search..">
                        <button type="submit">Search</button>
                    </div>
                </div>
                <ul class="order__list order__list--admin">
                    <li class="order profile__order profile__order--admin" v-for="order in sortedOrders" :key="order.orderId">
                        <a class="order__box order__box--admin" href="/order">
                            <div class="order__snapshot">Here comes the shoe snapshot</div>
                            <div class="order__data">
                                <p class="order__id"><span>Order ID:</span> {{ order.orderId }}</p>
                                <p class="order__shoe"><span>Shoe ID:</span> {{ order.shoeId }}</p>
                                <p class="order__buyer"><span>Customer:</span> {{ firstName }} {{ lastName }}</p>
                            </div>
                            <p v-if="order.status === 1" class="order__status order__status--received">Order Received✉️</p>
                            <p v-else-if="order.status === 2" class="order__status order__status--production">In Production🏭</p>
                            <p v-else-if="order.status === 3" class="order__status order__status--preparing">Preparing Order🎁</p>
                            <p v-else-if="order.status === 4" class="order__status order__status--delivering">Order Send🚚</p>
                            <p v-else-if="order.status === 5" class="order__status order__status--arrived">Order Arrived✅</p>
                        </a>
                        <div class="order__options">
                            <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                                <option value="1" class="status__select__option status__select--status1">Order Received</option>
                                <option value="2" class="status__select__option status__select--status2">In Production</option>
                                <option value="3" class="status__select__option status__select--status3">Preparing Order</option>
                                <option value="4" class="status__select__option status__select--status4">Order Send</option>
                                <option value="5" class="status__select__option status__select--status5">Order Arrived</option>
                            </select>
                            <button>Cancel Order</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .home__orders__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
        padding: 0 2%;
    }

    .home__searchbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 30%;
    }

    .home__searchbar input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 2px;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .home__searchbar button {
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #4769FF;
        color: #fff;
        cursor: pointer;
    }

    .home__searchbar button:hover {
        background-color: #DD49FF;
    }

    .order__list--admin {
        width: 90%;
        margin-left: 5%;
        height: calc(100vh - 180px);
        padding: 0;
    }

    .profile__order--admin {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
        padding: 0 2%;
    }

    .order__box--admin {
        margin-right: 8px;
    }

    .order__options {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 20%;
        min-width: 132px;
    }

    .order__options select {
        width: 100%;
        height: 60px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10%;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
    }

    .order__options button {
        width: 100%;
        height: 60px;
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #FF4769;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
    }
</style>