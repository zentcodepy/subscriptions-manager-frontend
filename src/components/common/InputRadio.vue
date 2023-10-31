<script setup lang="ts">
    defineProps({
        inputId: String,
        inputName: String,
        label: String,
        modelValue: String,
        value: String,
    })

    defineEmits(['update:modelValue'])
</script>
<template>
    <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        type="radio"
        :id="inputId"
        :name="inputName"
        :value="value"
        @input="$emit('update:modelValue', $event.target.value)"
    >
    <label
        class="ml-2 font-medium text-sm"
        :for="inputId"
    >
        {{ label }}
    </label>
</template>