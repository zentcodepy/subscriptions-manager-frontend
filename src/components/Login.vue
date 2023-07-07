<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const showLoading = ref(false);

function submit(event: Event){
    event.preventDefault();

    showLoading.value = true;

    const url = '/api/sanctum/csrf-cookie';
    axios
        .get(url)
        .then(response => {
            if (response.status == 204) {
                doLogin();
            }
        })
        .catch(error => {
            showLoading.value = false;
            console.log(error);
            alert("Error");
        });
}

function doLogin(){
    const url = '/api/api/login';
    axios
        .post(url, {
            email: email.value,
            password: password.value
        })
        .then(response => {
            showLoading.value = false;
            if (response.status == 200) {
                alert("Successful login")
            }
            else {
                alert("Invalid credentials");
            }
        })
        .catch(error => {
            showLoading.value = false;
            console.log(error);
            alert("Error");
        })
}
</script>

<template>
    <form @submit="submit">
        <h1 v-show="showLoading">Loading...</h1>
        <div>
            <label for="email">Email</label>
            <br>
            <input v-model="email" id="email" type="email" required>
        </div>
        <br>
        <div>
            <label for="password">Password</label>
            <br>
            <input v-model="password" id="password" type="password" required>
        </div>
        <br>
        <div>
            <button type="submit">Sign in</button>
        </div>
    </form>
</template>