<script setup lang="ts">
import { ref } from 'vue'

const email = ref('');
const password = ref('');

function submit(event: Event){
    event.preventDefault();
    console.log(email.value);
    console.log(password.value);
    alert("send")
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