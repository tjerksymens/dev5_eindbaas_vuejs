<script setup>
import Logo from "./Logo.vue";
import { ref } from "vue";

const user = ref({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    adress: "",
    city: "",
    country: "",
});

const handleSignup = () => {
    const enteredUsername = document.querySelector('input[name="username"]').value;
    const enteredPassword = document.querySelector('input[name="password"]').value;
    const enteredConfirmPassword = document.querySelector('input[name="confirm password"]').value;
    const enteredFirstname = document.querySelector('input[name="firstname"]').value;
    const enteredLastname = document.querySelector('input[name="lastname"]').value;
    const enteredStreet = document.querySelector('input[name="street"]').value;
    const enteredCity = document.querySelector('input[name="city"]').value;
    const enteredCountry = document.querySelector('input[name="country"]').value;

    if (enteredPassword === enteredConfirmPassword) {
        if (enteredUsername === "" || enteredPassword === "" || enteredConfirmPassword === "" || enteredFirstname === "" || enteredLastname === "" || enteredStreet === "" || enteredCity === "" || enteredCountry === "") {
            return document.querySelector(".form__error").innerHTML = "Please fill in all fields";
        } else if (enteredPassword.length < 5) {
            return document.querySelector(".form__error").innerHTML = "The password must be at least 5 characters long";
        } //if the firtsname isn't a string return error
        else if (!enteredFirstname.match(/^[a-zA-Z\s]+$/)) {
            return document.querySelector(".form__error").innerHTML = "Please enter a valid first name";
        } //if the lastname isn't a string return error
        else if (!enteredLastname.match(/^[a-zA-Z\s]+$/)) {
            return document.querySelector(".form__error").innerHTML = "Please enter a valid last name";
        } //if adress doesn't contain a string + number up to 10000 return error
        else if (!enteredStreet.match(/^[a-zA-Z\s]+[0-9]{1,4}$/)) {
            return document.querySelector(".form__error").innerHTML = "Please enter a valid adress";
        } //if city doesn't contain a string return error
        else if (!enteredCity.match(/^[a-zA-Z\s]+$/)) {
            return document.querySelector(".form__error").innerHTML = "Please enter a valid city";
        } //if country doesn't contain a string return error
        else if (!enteredCountry.match(/^[a-zA-Z\s]+$/)) {
            return document.querySelector(".form__error").innerHTML = "Please enter a valid country";
        } //if all fields are filled in correctly
        else {
            user.value.username = enteredUsername;
            user.value.password = enteredPassword;
            user.value.first_name = enteredFirstname;
            user.value.last_name = enteredLastname;
            user.value.adress = enteredStreet;
            user.value.city = enteredCity;
            user.value.country = enteredCountry;
            console.log(user.value);
            //upload to api
            fetch("https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user.value),
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
                            return document.querySelector(".form__error").innerHTML = "This username already exists";
                        } else {
                            return document.querySelector(".form__error").innerHTML = "Something went wrong";
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            //return window.location.href = "/login";
        }
    } else {
        document.querySelector(".form__error").innerHTML = "The passwords do not match";
    }
};
</script>

<template>
    <header>
        <Logo />
    </header>
    <main class="signup">
        <div class="main__content signup__form">
            <div class="signup__form__background form__background"></div>
            <div class="signup__form__content form__content">
                <h1 class="form__title">Welcome to Swear</h1>
                <div class="signup__container form__container">
                    <div class="signup__container__form">
                        <div class="form__divider form__divider__1">
                            <div class="username__field form__field">
                                <label for="username">Username: </label>
                                <input type="text" placeholder="Enter Username" name="username" required>
                            </div>
                            <div class="password__field form__field">
                                <label for="password">Password: </label>
                                <input type="password" placeholder="Enter Password" name="password" required>
                            </div>
                            <div class="confirm-password__field form__field">
                                <label for="confirm-password">Confirm password: </label>
                                <input type="password" placeholder="Confirm Password" name="confirm password" required>
                            </div>
                        </div>
                        <div class="form__divider form__divider__2">
                            <div class="firstname__field form__field form__field--signup">
                                <label for="firstname">First name: </label>
                                <input type="text" placeholder="First Name" name="firstname" required>
                            </div>
                            <div class="lastname__field form__field form__field--signup">
                                <label for="lastname">Last name: </label>
                                <input type="text" placeholder="Last Name" name="lastname" required>
                            </div>
                            <div class="street__field form__field form__field--signup">
                                <label for="street">Adress: </label>
                                <input type="text" placeholder="Adress Line" name="street" required>
                            </div>
                            <div class="city__field form__field form__field--signup">
                                <label for="city">City: </label>
                                <input type="text" placeholder="City" name="city" required>
                            </div>
                            <div class="city__field form__field form__field--signup">
                                <label for="country">Country: </label>
                                <input type="text" placeholder="Country" name="country" required>
                            </div>
                        </div>
                    </div>
                    <button @click="handleSignup" type="submit" class="form__btn">Sign Up</button>
                </div>
                <div class="form__links">
                    <p class="form__link__description">Already have an account?</p>
                    <a class="form__link" href="/login">Login here</a>
                </div>
                <p class="form__error"></p>
            </div>
        </div>
    </main>
</template>

<style scoped>
.signup__form__background {
    width: 80%;
    height: 480px;
    margin-left: calc(10% - 20px);
}

.signup__form__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 480px;
    width: 80%;
    left: calc(10% - 20px);
    top: 174px;
    overflow-y: scroll;
}

.signup__container {
    margin: 0;
    height: 80%;
}

.signup__container button {
    width: 40%;
    position: relative;
    left: 60%;
    margin: 0;
}

.signup__container__form {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.form__divider {
    display: inline-block;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 50%;
    margin: 0;
}

.form__field--signup {
    width: 90%;
}
</style>