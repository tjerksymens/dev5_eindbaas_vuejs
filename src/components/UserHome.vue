<script setup>
    import Logo from "./Logo.vue";
    import { onMounted } from "vue";

    // Function to generate random delay between -10s and 10s to apply to each title (each h1 with the animation)
    function getRandomDelay() {
    return Math.floor(Math.random() * 21) - 10;
    }

    onMounted(() => {
    // Apply random delay to each title (each h1 with the animation) after the component is mounted
    const titles = document.querySelectorAll('.home--user__title');
    titles.forEach((title) => {
        title.style.animationDelay = `${getRandomDelay()}s`;
    });
    });
</script>

<template>
    <header>
        <Logo />
        <nav>
            <a href="/create" class="button__header">Create</a>
            <a href="/profile" class="button__header">Profile</a>
        </nav>
    </header>
    <main class="home home--user">
        <div class="main__content home--user__content">
            <h1 class="home--user__title">*Create your own pair of Swear*      *Create your own pair of Swear*</h1>
            <h1 class="home--user__title">*Create your own pair of Swear*      *Create your own pair of Swear*</h1>
            <a class="button__main" href="/create">Start here</a>
            <h1 class="home--user__title">*Create your own pair of Swear*      *Create your own pair of Swear*</h1>
            <h1 class="home--user__title">*Create your own pair of Swear*      *Create your own pair of Swear*</h1>
        </div>
    </main>
</template>

<style scoped>
    .home--user {
        background-image: url("../assets/Swear-Banner.jpg");
        background-size: cover;
        background-position: center;
        overflow-x: hidden;
    }

    .home--user__content {
        height: calc(100% - 170px);
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center; 
    }

    .home--user__content h1 {
        color: #69ff47;
        width: 100%;
        text-transform: uppercase;
        font-size: 4rem;
        white-space: nowrap;
        opacity: 0; /* Initially set opacity to 0 */
    }

    .home--user__title {
        animation: roll 20s linear infinite;
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

    @media screen and (max-width: 1300px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-200%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 1200px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-220%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 1100px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-240%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-260%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 900px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-290%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 800px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-350%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 700px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-390%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 600px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-450%);
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 500px) {
        @keyframes roll {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            1% {
                opacity: 1; /* Gradually increase opacity at the beginning of the animation */
            }
            100% {
                transform: translateX(-500%);
                opacity: 1;
            }
        }
    }
</style>