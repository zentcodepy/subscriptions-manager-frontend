<script setup lang="ts">
import InputLabel from '../../components/common/InputLabel.vue';

defineProps({
    inputId: String,
    label: String,
    modelValue: Boolean
});

defineEmits(['update:modelValue']);
</script>
<template>
    <InputLabel 
        :for="inputId"
        :text="label">
    </InputLabel>
    <input
        type="checkbox"
        :id="inputId"
        @input="$emit('update:modelValue', $event.target.checked)"
    >
</template>