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
        <nav class="nav--one-button">
            <a href="/profile" class="button__header">Profile</a>
        </nav>
    </header>
    <main class="confirm">
        <div class="main__content confirm__content">
            <div class="order__head">
                <h1 class="confirm__title">We received your order</h1>
                <a class="order__close" href="#" @click="openPopup"></a>
            </div>
            <div class="confirm__order" v-for="order in orders" :key="order.orderId">
                <div class="order__snapshot confirm__order__snapshot" :style="{ backgroundImage: 'url(' + order.snapshot + ')' }"></div>
                <div class="order__data confirm__order__data">
                    <h2 class="customer">Order for: <span>{{ firstName }} {{ lastName }}</span></h2>
                    <p class="order__id confirm__order__id"><span>Order ID:</span> {{ order.orderId }}</p>
                    <p class="order__shoe confirm__order__shoe"><span>Shoe ID:</span> {{ order.shoeId }}</p>
                    <p class="order__adress confirm__order__adress"><span>Adress:</span> {{ order.adress }}</p>
                    <p class="order__status order__status--setup confirm__order__status"><span>Status:</span> Order setup🚩</p>
                    <div class="order__payment">
                        <h2>Select your payment method</h2>
                        <div class="order__payment__options">
                            <a class="order__payment__method" href="/confirmed">Paypal</a>
                            <a class="order__payment__method" href="/confirmed">Apple Pay</a>
                            <a class="order__payment__method" href="/confirmed">Bancontact</a>
                        </div>
                    </div>
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
.order__payment {
    margin-top: 10px;
}

.order__payment__options {
    width: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-left: 20px;
}

.order__payment__method {
    width: 30%;
    height: 40px;
    border-radius: 12px;
    background-color: #4769FF;
    color: #000;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order__payment__method:hover {
    background-color: #69FF47;
    color: #FFF;
}
</style>