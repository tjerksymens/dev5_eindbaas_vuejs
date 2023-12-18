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
});
</script>

<template>
    <header>
        <Logo />
    </header>
    <main class="admin__profile">
        <div class="admin__profile__content">
            <div class="admin__profile__fill"></div>
            <div v-if="user" class="admin__profile__data">
                <div class="admin__data">
                    <h1>Hey there, {{ user.data.user.first_name }} {{ user.data.user.last_name }}</h1>
                    <div class="admin__data__location">
                        <p><span>Work location: </span></p>
                        <div class="admin__data__location__adress">
                            <p>{{ user.data.user.adress }},</p>
                            <p>{{ user.data.user.city }},</p>
                            <p>{{ user.data.user.country }}</p>
                        </div>
                    </div>
                </div>
                <p><span>Admin status: </span> Editor</p>
                <div class="change__password ">

                </div>
            </div>
            <div v-else class="admin__profile__data">
                <div class="admin__data">
                    <h1>Hey there,  Admin</h1>
                    <div class="admin__data__location">
                        <p><span>Work location: </span></p>
                        <div class="admin__data__location__adress">
                            <p>Unknown</p>
                        </div>
                    </div>
                    <p class="profile__admin__status"><span class="profile__admin__status--span">Admin status: </span> Editor</p>
                </div>
                <div class="change__password ">

                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
h1 {
    margin-top: 16px;
    margin-left: 16px;
    color: #69ff47;
}

p span {
    font-weight: bold;
}

.admin__profile__content {
    display: grid;
    grid-template-columns: 2fr 3fr;
    width: 100%;
    height: 100%;
}

.admin__profile__fill {
    background-image: url(../../assets/Swear-Back.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.admin__profile__data {
    height: calc(100% - 90px);
    margin-top: 90px;
}

.admin__data {
    height: 40vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.admin__data__location {
    display: flex;
    align-items: top;
}

.profile__admin__status--span {
    margin-right: 30px;
}
</style>