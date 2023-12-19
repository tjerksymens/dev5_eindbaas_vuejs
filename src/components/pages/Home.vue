<script setup>
import UserHome from "../user/UserHome.vue";
import AdminHome from "../admin/AdminHome.vue";
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
    console.log(data);
    isAdmin.value = data?.data?.admin === true;
    console.log(isAdmin);
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
        <AdminHome />
    </div>
    <div v-else>
        <UserHome />
    </div>
</template>

<style scoped>

</style>