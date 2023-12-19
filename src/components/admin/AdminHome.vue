<script setup>
    import Logo from "../general/Logo.vue";
    import { ref, watchEffect, onMounted } from "vue";

    //twee variabelen voor de naam van de admin
    //deze worden geupdate opgehaald uit de api
    // Declare variables outside the fetch request
    let firstName = "Capitan";
    let lastName = "Admin";

    let socketServer;


    // Fetch user data
    onMounted(async () => {
        socketServer = new WebSocket("wss://dev5-eindbaas-nodejs-api.onrender.com/primus");

        socketServer.onopen = () => {
            console.log('WebSocket connection opened');
        };

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
            orders.value = data.data;

            socketServer.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);

                const orderIndex = orders.value.findIndex(order => order._id === data.data._id);

                if (orderIndex !== -1) {
                    // If the order exists in the array, update it
                    orders.value[orderIndex] = data.data;
                } else {
                    // If the order doesn't exist, add it to the array
                    orders.value.push(data.data);
                }
            };

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
        sortedOrders.value = orders.value.slice().sort((a, b) => {
            return b.status - a.status;
        });
    });

    const updateOrderStatus = async (order) => {
        try {
            const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/${order._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    status: order.status,
                }),
            });

            if (response === undefined) {
                throw new Error('Empty response received');
            }

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const data = await response.json();
            console.log('Order placed successfully:', data);
            console.log(data.data);
            orderStatusSocket(data.data);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };


    const orderStatusSocket = (order) => {
        console.log('orderStatusSocket 🚚', order)
        let data = {
            action: 'orderStatus',
            order: order,
        };

        socketServer.send(JSON.stringify(data));
    };

    const cancelOrder = async (order) => {
        try {
            const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/shoes/${order._id}`, {
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
            fetchOrders();
            cancelSocket(data.data._id);

        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const cancelSocket = (orderId) => {
    console.log('cancelSocket 🗑️')
    let data = {
        action: 'cancel',
        orderId: orderId,
    };

    socketServer.send(JSON.stringify(data));
};


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
                    <h2>Current Orders:  <span>{{ sortedOrders.length }}</span></h2> 
                    <div class="home__searchbar">
                        <input type="text" placeholder="Search..">
                        <button type="submit">Search</button>
                    </div>
                </div>
                <ul class="order__list order__list--admin">
                    <li class="order profile__order profile__order--admin" v-for="order in sortedOrders" :key="order.orderId">
                        <router-link :to="{ name: 'order', params: { orderId: order._id } }" class="order__box order__box--admin">
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
        padding-right: 2%;
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

    @media screen and (max-width: 800px) {
    .order {
        height: 300px;
    }

    .order__options {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .order__options select {
        width: 40%;
        display: inline-block;
        margin: 0;
    }

    .order__options button {
        width: 40%;
        display: inline-block;
        margin: 0;
    }
    .profile__order--admin {
        display: block;
    }

    .order__box--admin {
        height: 60%;
        width: calc(100% - 28px);
    }

    .order__options {
        width: 100%;
        margin-top: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }
}
</style>