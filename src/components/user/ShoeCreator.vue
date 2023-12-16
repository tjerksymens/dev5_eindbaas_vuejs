<script setup>
import Logo from "../general/Logo.vue";

//Wanneer je weggaat van de pagina moet de user een melding krijgen dat hij zijn schoen niet heeft opgeslagen

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
    <main class="creator">
        <div class="creator__shoe-display">
            <h1>ShoeCreator ThreeJS</h1>
            <p>De schoen 3D komt hier</p>
        </div>
        <div class="creator__shoe-options">
            <a class="order__close order__close--black" href="#" @click="openPopup"></a>
            <h1>ShoeCreator Color selector</h1>
            <p>De settings voor de schoen en het kleuren selecteren komt hier</p>
            <br>
            <p>PS de kleuren zijn temporary 🤗</p>
            <br>
            <a class="creator__save" href="/confirm">Save This Model</a>
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
.creator__save {
    background-color: #69ff47;
    color: #000;
    padding: 10px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
}

.creator__save:hover {
    background-color: #000;
    color: #69ff47;
}
</style>