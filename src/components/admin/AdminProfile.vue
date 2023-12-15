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
</script>

<template>
    <header>
        <Logo />
    </header>
    <main>
        <h1>AdminProfile</h1>
    </main>
</template>

<style scoped>

</style>