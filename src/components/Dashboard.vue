<script setup lang="ts">
import axios from 'axios';

const url = '/base-url/api/user';
    axios
        .get(url)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
            alert("Error");
        });
</script>
<template>
    <div>
        <h1>Dashboard</h1>
    </div>
</template>