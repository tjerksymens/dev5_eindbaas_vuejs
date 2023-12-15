<script setup>
    import Logo from "../general/Logo.vue";
</script>

<template>
    <header>
        <Logo />
        <nav>
            <a href="/create" class="button--header">Create</a>
            <a href="/profile" class="button--header">Profile</a>
        </nav>
    </header>
    <main class="home home--user">
        <div class="main--content--home home--user--content">
            <h1 class="home--user--title-1">*Create your own pair of Swear*   *Create your own pair of Swear*</h1>
            <h1 class="home--user--title-2">*Create your own pair of Swear*   *Create your own pair of Swear*</h1>
            <a class="button--main" href="/create">Start here</a>
            <h1 class="home--user--title-3">*Create your own pair of Swear*   *Create your own pair of Swear*</h1>
            <h1 class="home--user--title-4">*Create your own pair of Swear*   *Create your own pair of Swear*</h1>
        </div>
    </main>
</template>

<style scoped>
    .home--user {
        background-image: url("../../assets/Swear-Banner.jpg");
        background-size: cover;
        background-position: center;
        overflow-x: hidden;
    }

    .home--user--content {
        height: calc(100% - 170px);
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center; 
    }

    .home--user--content h1 {
        color: #69ff47;
        width: 100%;
        text-transform: uppercase;
        font-size: 4rem;
        white-space: nowrap;
        opacity: 0; /* Initially set opacity to 0 */
    }

    .home--user--title-1 {
        animation: roll 15s linear infinite;
        animation-delay: 7s;
    }

    .home--user--title-2 {
        animation: roll 15s linear infinite;
    }

    .home--user--title-3 {
        animation: roll 15s linear infinite;
        animation-delay: 4s;
    }

    .home--user--title-4 {
        animation: roll 15s linear infinite;
        animation-delay: 10s;
    }

    @keyframes roll {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        1% {
            opacity: 1; /* Gradually increase opacity at the beginning of the animation */
        }
        100% {
            transform: translateX(-180%);
            opacity: 1;
        }
    }
</style>