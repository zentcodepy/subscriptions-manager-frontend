<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import InputLabel from '../../components/common/InputLabel.vue';

defineProps({
    inputId: String,
    label: String,
    modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const updateModelValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
};

</script>
<template>
    <InputLabel 
        :for="inputId"
        :text="label">
    </InputLabel>
    <input
        type="checkbox"
        :id="inputId"
        @input="updateModelValue"
    >
</template>
