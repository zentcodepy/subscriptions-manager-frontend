<script setup lang="ts">
import { interceptResponse } from './network/axiosInterceptor.js';

interceptResponse()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
