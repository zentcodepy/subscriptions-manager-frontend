<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            default: ''
        },
        urlRoute: {
            type: String,
            default: '#'
        }
    });
</script>
<template>
    <router-link 
        :to=urlRoute
        class="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-3 py-2 text-sm font-medium"
    >
        {{ title }}
    </router-link>
</template>