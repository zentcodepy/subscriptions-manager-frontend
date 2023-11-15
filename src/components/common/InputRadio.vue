<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

    defineProps({
        inputId: String,
        inputName: String,
        label: String,
        modelValue: String,
        value: String,
    })

    const emit = defineEmits(['update:modelValue']);

  const updateModelValue = (e: Event) => {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
  };
</script>
<template>
    <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        type="radio"
        :id="inputId"
        :name="inputName"
        :value="value"
        @input="updateModelValue"
    >
    <label
        class="ml-2 font-medium text-sm"
        :for="inputId"
    >
        {{ label }}
    </label>
</template>
