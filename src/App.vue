<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const url = '/base-url/api/user';
    axios
        .get(url)
        .then(response => {
            if (response.status == 401 || response.status == 403) {
                router.push('/login');                
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
  <Navbar></Navbar>
  <div class="m-10">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
