<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar></Navbar>
  <div class="m-10">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
