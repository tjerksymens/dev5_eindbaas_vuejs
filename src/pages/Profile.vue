<script setup>
import UserProfile from "../components/UserProfile.vue";
import AdminProfile from "../components/AdminProfile.vue";
import { onMounted, ref } from "vue";

const isAdmin = ref(false);

const checkAdmin = async () => {
  try {
    const response = await fetch(
      `https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/check-admin/${localStorage.getItem("token")}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    isAdmin.value = data?.data?.admin === true;
    return isAdmin;
  } catch (error) {
    console.error('Error fetching user information:', error);
    return false;
  }
};

onMounted(checkAdmin);
</script>

<template>
    <div v-if="isAdmin">
        <AdminProfile />
    </div>
    <div v-else>
        <UserProfile />
    </div>
</template>

<style scoped>

</style>