<script setup>
import UserProfile from "../user/UserProfile.vue";
import AdminProfile from "../admin/AdminProfile.vue";
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
        <AdminProfile />
    </div>
    <div v-else>
        <UserProfile />
    </div>
</template>

<style scoped>

</style>