<script setup>
import Logo from "./Logo.vue";
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

const handleReset =() => {
    //al die parameters werken
    const currentPassword = document.querySelector('input[name="old-password"]').value;
    const newPassword = document.querySelector('input[name="new-password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm password"]').value;
    const username = user.value.data.user.username;
    console.log(username);

    //check if th new password and confirm password are the same
    if (newPassword === confirmPassword) {
        console.log("passwords match");
        fetch("https://dev5-eindbaas-nodejs-api.onrender.com/api/v1/users/change-password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ 
                    username: user.value.data.user.username,
                    oldPassword: currentPassword,
                    newPassword: newPassword
                }), 
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            document.querySelector(".form__error").innerHTML = data.message;
            if (data.status === "success") {
                localStorage.removeItem("token");
                console.log("Token destroyed");
                return window.location.href = "/login";
            } else {
                if (data.status === "error") {
                    return document.querySelector(".form__error").innerHTML = data.message;
                } else {
                    return document.querySelector(".form__error").innerHTML = "Something went wrong";
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    } else {
        return document.querySelector(".form__error").innerHTML = "The new passwords do not match";
    }
};

    //Wanneer je wil uitloggen opent de popup
    const openPopup = () => {
        document.querySelector(".popup").classList.add("open__popup");
    }

    //popup sluiten wanneer er op de popup background wordt geklikt of op close
    const closePopup = () => {
        document.querySelector(".popup").classList.remove("open__popup");
    }

    //logout the user by destroying the token and redirecting to /login
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
</script>

<template>
    <header>
        <Logo />
        <nav class="nav--one-button">
            <a href="/" class="button__header">Home</a>
        </nav>
    </header>
    <main class="admin__profile">
        <div class="admin__profile__content">
            <div class="admin__profile__fill"></div>
            <div v-if="user" class="admin__profile__data">
                <div class="admin__data">
                    <h1>Hey there, {{ user.data.user.first_name }} {{ user.data.user.last_name }}</h1>
                    <div class="admin__data__location admin__data__section">
                        <p><span>Work location: </span></p>
                        <div class="admin__data__location__adress">
                            <p>{{ user.data.user.adress }},</p>
                            <p>{{ user.data.user.city }},</p>
                            <p>{{ user.data.user.country }}</p>
                        </div>
                    </div>
                    <div class="admin__data__status admin__data__section">
                        <p><span>Admin status: </span></p>
                        <p> Editor</p>
                    </div>
                </div>
                <div class="admin__profile__settings">
                    <div class="change__password">
                        <h2>Reset your password</h2>
                        <div class="reset__form">
                            <div class="form__divider form__divider__1">
                                <div class="password__field form__field password__field--old">
                                    <label for="old-password">Current password: </label>
                                    <input type="password" placeholder="Enter Old Password" name="old-password" required>
                                </div>
                                <div class="password__field form__field password__field--new">
                                    <label for="new-password">New password: </label>
                                    <input type="password" placeholder="Enter New Password" name="new-password" required>
                                </div>
                                <div class="confirm-password__field form__field password__field--confirm">
                                    <label for="confirm-password">Confirm new password: </label>
                                    <input type="password" placeholder="Confirm New Password" name="confirm password" required>
                                </div>
                            </div>
                            <button @click="handleReset" type="submit" class="form__btn form__btn__reset">Reset</button>
                        </div>
                        <p class="form__error"></p>
                    </div>
                    <div class="logout profile__logout">
                        <h2>Profile settings</h2>
                        <button @click="openPopup" class="logout__btn">Logout</button>
                    </div>
                </div>
            </div>
            <div v-else class="admin__profile__data">
                <div class="admin__data">
                    <h1>Hey there,  Admin</h1>
                    <div class="admin__data__location admin__data__section">
                        <p><span>Work location: </span></p>
                        <div class="admin__data__location__adress">
                            <p>Unknown</p>
                        </div>
                    </div>
                    <div class="admin__data__status admin__data__section">
                        <p class="profile__admin__status"><span class="profile__admin__status--span">Admin status: </span></p>
                        <p> Editor</p>
                    </div>
                </div>
                <div class="admin__profile__settings">
                    <div class="change__password ">
                        <div>
                            <h2>Reset your password</h2>
                            <div class="reset__form">
                                <div class="form__divider form__divider__1">
                                    <div class="password__field form__field password__field--old">
                                        <label for="old-password">Current password: </label>
                                        <input type="password" placeholder="Enter Old Password" name="old-password" required>
                                    </div>
                                    <div class="password__field form__field password__field--new">
                                        <label for="new-password">New password: </label>
                                        <input type="password" placeholder="Enter New Password" name="new-password" required>
                                    </div>
                                    <div class="confirm-password__field form__field password__field--confirm">
                                        <label for="confirm-password">Confirm new password: </label>
                                        <input type="password" placeholder="Confirm New Password" name="confirm password" required>
                                    </div>
                                </div>
                                <button @click="handleReset" type="submit" class="form__btn form__btn__reset">Reset</button>
                            </div>
                            <p class="form__error"></p>
                        </div>
                    </div>
                    <div class="logout profile__logout">
                        <h2>Profile settings</h2>
                        <button @click="openPopup" class="logout__btn">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div class="popup logout__popup">
        <div class="popup__background" @click="closePopup"></div>
        <div class="popup__content">
            <h2 class="popup__title close__popup__title">Are you sure you want to logout?</h2>
            <p class="popup__text close__popup__text">You will have to log back in</p>
            <div class="popup__options close__popup__options">
                <a class="popup__option btn btn--positive" href="#" @click="handleLogout">Yes</a>
                <a class="popup__option btn btn--negative" href="#" @click="closePopup">No</a>
            </div>
        </div>
    </div>
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
    background-image: url(../assets/Admin-Profile.jpg);
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
    min-height: 280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.admin__data__section {
    width: 70%;
    margin-left: 16px;
    display: flex;
    align-items: top;
    justify-content: space-between;
}

.admin__data__location {
    margin-top: 20px;
}

.admin__data__status {
    margin-top: 8px;
    margin-bottom: 16px;
}

.profile__admin__status--span {
    margin-right: 30px;
}

.admin__profile__settings {
    height: calc(60vh - 122px);
    min-height: 300px;
    width: calc(100% - 32px);
    padding: 16px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    justify-content: space-between;
    background-color: lightgrey;
}

.change__password {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.profile__logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-left: 2px solid #000;
    text-align: center;
}

.logout__btn {
    height: 60px;
    margin-bottom: 24px;
}

@media screen and (max-width: 1300px) {
    .admin__profile__content {
        grid-template-columns: 1fr 3fr;
    }
}

@media screen and (max-width: 1000px) {
    .admin__profile__content {
        display: flex;
    }
    
    .admin__profile__fill {
        display: none;
    }
}
</style>