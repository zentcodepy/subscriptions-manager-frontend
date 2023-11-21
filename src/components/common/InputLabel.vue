<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    text: String,
})
</script>
<template>
    <label class="block text-sm font-medium leading-6 text-gray-900">
        {{ text }}
    </label>
</template>
