<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '../../../components/common/TextInput.vue';

const emit = defineEmits(['input-emitted']);
const businessName = ref('');

function handleInput() {
    emit('input-emitted', businessName.value)
}
</script>
<template>
    <div class="grid grid-cols-3 gap-4">
        <TextInput
            placeholder="Business Name or Document Number"
            v-model="businessName"
            @input="handleInput()">
        </TextInput>
    </div>
</template>