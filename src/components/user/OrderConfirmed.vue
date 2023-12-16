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
        status: 3,
        adress: "22 Carnaby St, Carnaby, London W1F 7DB, United Kingdom",
        snapshot: "https://cdn-images.farfetch-contents.com/14/61/25/03/14612503_23499899_600.jpg"
    }
]);

//popup openen wanneer er op de close button wordt geklikt
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
        <nav>
            <a href="/create" class="button__header">Create</a>
            <a href="/profile" class="button__header">Profile</a>
        </nav>
    </header>
    <main class="confirmed">
        <div class="main__content confirmed__content">
            <div class="order__head">
                <h1 class="confirmed__title">Payment succesfull</h1>
                <a class="order__close" href="#" @click="openPopup"></a>
            </div>
            <div class="confirmed__order" v-for="order in orders" :key="order.orderId">
                <div class="order__snapshot confirmed__order__snapshot" :style="{ backgroundImage: 'url(' + order.snapshot + ')' }"></div>
                <div class="order__data confirmed__order__data">
                    <h2 class="customer">Order for <span>{{ firstName }} {{ lastName }}</span> accepted</h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order.orderId }}</p>
                    <p class="order__shoe confirm__order__shoe"><span>Shoe ID:</span> {{ order.shoeId }}</p>
                    <p class="order__adress confirm__order__adress"><span>Adress:</span> {{ order.adress }}</p>
                    <p class="order__status order__status--accepted confirmed__order__status"><span>Status:</span> Order accepted✉️</p>
                </div>
            </div>
        </div>
    </main>
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

</style>