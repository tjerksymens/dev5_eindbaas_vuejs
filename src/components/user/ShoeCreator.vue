<script setup>
import Logo from "../general/Logo.vue";

//Wanneer je weggaat van de pagina moet de user een melding krijgen dat hij zijn schoen niet heeft opgeslagen
</script>

<template>
    <header>
        <Logo />
        <nav class="nav--oneButton">
            <a href="/profile" class="button--header">Profile</a>
        </nav>
    </header>
    <main class="creator">
        <div class="creator--shoeDisplay">
            <h1>ShoeCreator ThreeJS</h1>
            <p>De schoen 3D komt hier</p>
        </div>
        <div class="creator--shoeOptions">
            <h1>ShoeCreator Color selector</h1>
            <p>De settings voor de schoen en het kleuren selecteren komt hier</p>
            <br>
            <p>PS de kleuren zijn temporary 🤗</p>
        </div>
    </main>
</template>

<style scoped>

</style>