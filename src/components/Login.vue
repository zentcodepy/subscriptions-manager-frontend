<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');

function submit(event: Event){
    event.preventDefault();
    alert("send")
    const url = '/api/sanctum/csrf-cookie';
    axios
        .get(url)
        .then(response => {
            if (response.status == 204) {
                doLogin();
            }
        })
        .catch(error => (console.log(error)));
}

function doLogin(){
    const url = '/api/login';
    axios
        .post(url, {
            email: email.value,
            password: password.value
        })
        .then(response => {
            if (response.status == 200) {
                alert("Successful login")
            }
            else {
                alert("Invalid credentials");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Error");
        })
}
</script>

<template>
    <form @submit="submit">
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