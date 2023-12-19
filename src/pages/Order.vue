<script setup>
import UserOrder from "../components/UserOrder.vue";
import AdminOrder from "../components/AdminOrder.vue";
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
        <AdminOrder />
    </div>
    <div v-else>
        <UserOrder />
    </div>
</template>

<style scoped>

</style>