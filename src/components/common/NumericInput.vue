<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    inputId: String,
    label: String,
    minValue: Number,
    modelValue: String,
})

const emit = defineEmits(['update:modelValue']);

const updateModelValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
};

</script>
<template>
    <label
        v-if="label"
        class="block text-sm font-medium leading-6 text-gray-900"
        :for="inputId"
    >
        {{ label }}
    </label>
    <input
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        type="number"
        :id="inputId"
        v-bind:value="modelValue"
        @input="updateModelValue"
        :min=minValue
    >
</template>
