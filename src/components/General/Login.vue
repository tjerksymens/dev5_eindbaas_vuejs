<script setup>
import Logo from "../general/Logo.vue";
import { ref } from "vue";

const handleLogin = () => {
  const enteredUsername = document.querySelector('input[name="username"]').value;
  const enteredPassword = document.querySelector('input[name="password"]').value;

  fetch("https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username: enteredUsername,
                    password: enteredPassword
                }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            if (data.status === "success") {
                let token = data.data.token;
                localStorage.setItem("token", token);
                return window.location.href = "/login";
            } else {
                if (data.status === "error") {
                    return document.querySelector(".form__error").innerHTML = "The password or username is incorrect";
                } else {
                    return document.querySelector(".form__error").innerHTML = "Something went wrong";
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};
</script>

<template>
    <header>
        <Logo />
    </header>
    <main class="login">
        <div class="main__content login__form">
            <div class="login__form__background form__background"></div>
            <div class="login__form__content form__content">
                <h1 class="form__title">Welcome back to Swear</h1>
                <div class="login__container form__container">
                    <div class="username__field form__field">
                        <label for="username">Username: </label>
                        <input type="text" placeholder="Enter Username" name="username" required>
                    </div>
                    <div class="password__field form__field">
                        <label for="password">Password: </label>
                        <input type="password" placeholder="Enter Password" name="password" required>
                    </div>
                    <button @click="handleLogin" type="submit" class="form__btn">Login</button>
                </div>
                <div class="form__links">
                    <p class="form__link__description">Don't have an account yet?</p>
                    <a class="form__link" href="/signup">Create a new account</a>
                </div>
                <p class="form__error"></p>
            </div>
        </div>
    </main>
</template>

<style scoped>

</style>