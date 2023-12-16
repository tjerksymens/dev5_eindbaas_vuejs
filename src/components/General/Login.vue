<script setup>
import Logo from "../general/Logo.vue";
import { ref } from "vue";

//variabele voor de login
//updaten naar API of lokaal bijhouden?????
let loggedin = 0;

const user = ref({
    username: "ben55",
    password: "5555"
});

const handleLogin = () => {
  const enteredUsername = document.querySelector('input[name="username"]').value;
  const enteredPassword = document.querySelector('input[name="password"]').value;

  if (enteredUsername === user.value.username && enteredPassword === user.value.password) {
    return window.location.href = "/home";
    loggedin = 1;
  } else {
    document.querySelector(".form__error").innerHTML = "The password or username is incorrect";
  }
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