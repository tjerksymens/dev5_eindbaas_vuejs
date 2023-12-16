<script setup>
import Logo from "../general/Logo.vue";
import { ref } from "vue";

const orders = ref([
    {
        orderId: 5002,
        shoeId: 1891,
        firstName: "Joe",
        lastName: "Jackson",
        adress: {
            firstLine: "22 Carnaby St, Carnaby",
            secondLine: "London W1F 7DB",
            thirdLine: "United Kingdom"
        },
        snapshot: "https://cdn-images.farfetch-contents.com/14/61/25/03/14612503_23499899_600.jpg",
        status: 3
    }
]);

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

//alles werkt behalve het updaten van de status wanneer er een nieuwe wordt gekozen in de select
//kan misschien opgelost worden door een watch effect te gebruiken of door LIVE api data
</script>

<template>
    <header>
        <Logo />
        <nav>
            <a href="/create" class="button__header">Create</a>
            <a href="/profile" class="button__header">Profile</a> 
        </nav>
    </header>
    <main class="confirmed">
        <div class="main__content confirmed__content">
            <div class="order__head">
                <h1 class="confirmed__title">Order information</h1>
                <a class="order__close" href="/"></a>
            </div>
            <div class="confirmed__order" v-for="order in orders" :key="order.orderId">
                <div class="order__snapshot confirmed__order__snapshot" :style="{ backgroundImage: 'url(' + order.snapshot + ')' }"></div>
                <div class="order__data confirmed__order__data">
                    <h2 class="customer">Order for <span>{{ order.firstName }} {{ order.lastName }}</span></h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order.orderId }}</p>
                    <p class="order__shoe confirm__order__shoe"><span>Shoe ID:</span> {{ order.shoeId }}</p>
                    <div class="order__adress__box">
                        <p><span>Adress:</span><br><br><br></p>
                        <p class="order__adress confirm__order__adress" >{{ order.adress.firstLine }} <br> {{ order.adress.secondLine }} <br> {{ order.adress.thirdLine }}</p>
                    </div>
                    <div v-if="order.status === 1" class="order__options order__options__id">
                        <p class="order__status order__status--accepted admin__order__status"><span>Status: </span>Order accepted✉️</p>
                        <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                            <option value="1" class="status__select__option status__select--status1">Order accepted</option>
                            <option value="2" class="status__select__option status__select--status2">In production</option>
                            <option value="3" class="status__select__option status__select--status3">Preparing order</option>
                            <option value="4" class="status__select__option status__select--status4">Order send</option>
                            <option value="5" class="status__select__option status__select--status5">Order arrived</option>
                        </select>
                    </div>
                    <div v-else-if="order.status === 2" class="order__options order__options__id">
                        <p class="order__status order__status--production admin__order__status"><span>Status: </span>In production🏭</p>
                        <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                            <option value="1" class="status__select__option status__select--status1">Order accepted</option>
                            <option value="2" class="status__select__option status__select--status2">In production</option>
                            <option value="3" class="status__select__option status__select--status3">Preparing order</option>
                            <option value="4" class="status__select__option status__select--status4">Order send</option>
                            <option value="5" class="status__select__option status__select--status5">Order arrived</option>
                        </select>
                    </div>
                    <div v-else-if="order.status === 3" class="order__options order__options__id">
                        <p class="order__status order__status--preparing admin__order__status"><span>Status: </span>Preparing order🎁</p>
                        <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                            <option value="1" class="status__select__option status__select--status1">Order accepted</option>
                            <option value="2" class="status__select__option status__select--status2">In production</option>
                            <option value="3" class="status__select__option status__select--status3">Preparing order</option>
                            <option value="4" class="status__select__option status__select--status4">Order send</option>
                            <option value="5" class="status__select__option status__select--status5">Order arrived</option>
                        </select>
                    </div>
                    <div v-else-if="order.status === 4" class="order__options order__options__id">
                        <p class="order__status order__status--delivering admin__order__status"><span>Status: </span>Order send🚚</p>
                        <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                            <option value="1" class="status__select__option status__select--status1">Order accepted</option>
                            <option value="2" class="status__select__option status__select--status2">In production</option>
                            <option value="3" class="status__select__option status__select--status3">Preparing order</option>
                            <option value="4" class="status__select__option status__select--status4">Order send</option>
                            <option value="5" class="status__select__option status__select--status5">Order arrived</option>
                        </select>
                    </div>
                    <div v-else-if="order.status === 5" class="order__options order__options__id">
                        <p class="order__status order__status--arrived admin__order__status"><span>Status: </span>Order arrived✅</p>
                        <select id="status__select" name="status select" v-model="order.status" :style="{ backgroundColor: getStatusColor(order.status) }">
                            <option value="1" class="status__select__option status__select__option--order status__select--status1">Order accepted</option>
                            <option value="2" class="status__select__option status__select__option--order status__select--status2">In production</option>
                            <option value="3" class="status__select__option status__select__option--order status__select--status3">Preparing order</option>
                            <option value="4" class="status__select__option status__select__option--order status__select--status4">Order send</option>
                            <option value="5" class="status__select__option status__select__option--order status__select--status5">Order arrived</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
 .order__options__id select {
    width: 80%;
    margin-left: 20px;
    margin-top: 8px;
 }
</style>