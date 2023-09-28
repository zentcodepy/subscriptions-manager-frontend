<script setup lang="ts">

const props = defineProps({
    inputId: String,
    inputType: {
        type: String,
        default: 'text',
    },
    modelValue: String,
    label: String,
    placeholder: String,
});

defineEmits(['update:modelValue']);
</script>

<template>
    <label 
        v-if="label"
        :for="inputId"
        class="block text-sm font-medium leading-6 text-gray-900">
        {{ label }}
    </label>
    <input 
        :type="inputType"
        :id="inputId"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        v-bind:value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        v-bind:placeholder="props.placeholder">
</template>