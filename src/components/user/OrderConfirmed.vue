<script setup>
import Logo from "../general/Logo.vue";
import { ref } from "vue";

//twee variabelen voor de naam van de user
//deze worden geupdate naar de api value via de login
let firstName = "Joe";
let lastName = "Jackson";

const orders = ref([
    {
        orderId: 5002,
        shoeId: 1891,
        adress: {
            firstLine: "22 Carnaby St, Carnaby",
            secondLine: "London W1F 7DB",
            thirdLine: "United Kingdom"
        },
        snapshot: "https://cdn-images.farfetch-contents.com/14/61/25/03/14612503_23499899_600.jpg"
    }
]);

const adress = ref([ 
    
]);
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
                <h1 class="confirmed__title">Payment succesfull</h1>
                <a class="order__close" href="/profile"></a>
            </div>
            <div class="confirmed__order" v-for="order in orders" :key="order.orderId">
                <div class="order__snapshot confirmed__order__snapshot" :style="{ backgroundImage: 'url(' + order.snapshot + ')' }"></div>
                <div class="order__data confirmed__order__data">
                    <h2 class="customer">Order for <span>{{ firstName }} {{ lastName }}</span> accepted</h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order.orderId }}</p>
                    <p class="order__shoe confirm__order__shoe"><span>Shoe ID:</span> {{ order.shoeId }}</p>
                    <div class="order__adress__box">
                        <p><span>Adress:</span><br><br><br></p>
                        <p class="order__adress confirm__order__adress" >{{ order.adress.firstLine }} <br> {{ order.adress.secondLine }} <br> {{ order.adress.thirdLine }}</p>
                    </div>
                    <p class="order__status order__status--accepted confirmed__order__status"><span>Status:</span> Order accepted✉️</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>

</style>