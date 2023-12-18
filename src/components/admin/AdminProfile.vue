<script setup>
import Logo from "../general/Logo.vue";
import { ref, onMounted } from "vue";

async function getUser() {
    try {
        const response = await fetch(`https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/${localStorage.getItem("token")}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user information:', error);
        return null;
    }
}

const user = ref(null);

onMounted(async () => {
    user.value = await getUser();
    console.log(user.value?.data.user);
});
</script>

<template>
    <header>
        <Logo />
    </header>
    <main class="admin__profile">
        <div class="main__content admin__profile__content">
            <div class="admin__profile__fill"></div>
            <div class="admin__profile__content">
                <h1>Hey there, {{ user.data.user.first_name }} {{ user.data.user.last_name }}</h1>
                <div>
                    <p><span>Work location: </span></p>
                    <div>
                        <p>{{ user.data.user.adress }},</p>
                        <p>{{ user.data.user.city }},</p>
                        <p>{{ user.data.user.country }}</p>
                    </div>
                </div>
                
                <p><span>Admin status: </span></p>
            </div>
        </div>
    </main>
</template>

<style scoped>

</style>