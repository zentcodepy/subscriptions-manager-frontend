<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: String,
    placeholder: String
});

const emit = defineEmits(['update:modelValue']);

const updateModelValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};

</script>

<template>
    <input type="text"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        v-bind:value="modelValue" @input="updateModelValue"
        v-bind:placeholder="props.placeholder">
</template>
