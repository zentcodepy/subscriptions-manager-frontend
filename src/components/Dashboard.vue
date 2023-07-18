<script setup lang="ts">
import AppLayout from '../components/AppLayout.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

let userIsLoggedIn = ref(false);

const router = useRouter();

const url = '/base-url/api/user';
    axios
        .get(url)
        .then(response => {
            if (response.status == 401 || response.status == 403) {
                router.push('/login');                
            } else if (response.status == 200) {
              userIsLoggedIn.value = true;
            }
        })
        .catch(error => {
            if (error.response.status == 401 || error.response.status == 403) {
                router.push('/login');
            } else {
               showErrorMessage();
            }
        });

function showErrorMessage(){
    // TODO:Replace with a more user friendly interface 
    alert("Error");
}
</script>
<template>
    <AppLayout>
        <h2>Dashboard</h2>
    </AppLayout>
</template>