<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['input-emitted']);
const businessName = ref('');

function handleInput() {
    emit('input-emitted', businessName.value)
}
</script>
<template>
    <div class="grid grid-cols-4 gap-4">
        <div class="relative mt-2 rounded-md shadow-sm">
            <input 
                type="text"
                id="business_name"
                v-model="businessName"
                @input="handleInput()"
                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Business Name">
        </div>
    </div>
</template>