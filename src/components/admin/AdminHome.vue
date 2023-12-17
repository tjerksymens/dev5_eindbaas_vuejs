<script setup>
    import Logo from "../general/Logo.vue";
    import { ref, watchEffect, onMounted } from "vue";

    //twee variabelen voor de naam van de admin
    //deze worden geupdate opgehaald uit de api
    // Declare variables outside the fetch request
    let firstName = "Capitan";
    let lastName = "Admin";

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

    const fetchOrders = async () => {
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

    onMounted(fetchOrders);
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
                                <p class="order__id"><span>Order ID:</span> {{ order._id }}</p>
                                <p class="order__shoe"><span>Shoe ID:</span> {{ order.name }}</p>
                                <p class="order__buyer"><span>Customer:</span> {{ order.user.first_name }} {{ order.user.last_name }} </p>
                            </div>
                            <p v-if="order.status === 1" class="order__status order__status--accepted">Order accepted✉️</p>
                            <p v-else-if="order.status === 2" class="order__status order__status--production">In production🏭</p>
                            <p v-else-if="order.status === 3" class="order__status order__status--preparing">Preparing order🎁</p>
                            <p v-else-if="order.status === 4" class="order__status order__status--delivering">Order send🚚</p>
                            <p v-else-if="order.status === 5" class="order__status order__status--arrived">Order arrived✅</p>
                        </a>
                        <div class="order__options">
                            <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                                <option value="1" class="status__select__option status__select--status1">Order accepted</option>
                                <option value="2" class="status__select__option status__select--status2">In production</option>
                                <option value="3" class="status__select__option status__select--status3">Preparing order</option>
                                <option value="4" class="status__select__option status__select--status4">Order send</option>
                                <option value="5" class="status__select__option status__select--status5">Order arrived</option>
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
</style>