<script setup>
import Logo from "../general/Logo.vue";

//create two variables to store the user's first name and last name
//values need to be emptied when updating code
let firstName = "Jan";
let lastName = "Peeters";
</script>

<template>
    <header>
        <Logo />
        <nav>
            <a href="/create" class="button--header">Create</a>
            <a href="/profile" class="button--header">Profile</a>
        </nav>
        <main class="profile profile--user">
            <div class="profile__fill">
                <div class="profile__fillImage"></div>
            </div>
            <div class="profile__user__content">
                <h1 class="profile__user__title">Welcome back, {{ firstName }} {{ lastName }}</h1>
                <a class="button__main" href="/create">Start here</a>
            </div>
        </main>
    </header>
    <main>
        <h1>UserProfile</h1>
    </main>
</template>

<style scoped>

</style>