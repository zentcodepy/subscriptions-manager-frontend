<script setup lang="ts">
import { ref } from 'vue';
import TextInput from '../../../components/common/TextInput.vue';
import debounce from '../../../utils/debounce.js';

const emit = defineEmits(['input-emitted']);
const businessName = ref('');

const debouncedEmitInput = debounce(() => { emit('input-emitted', businessName.value) }, 300);
</script>
<template>
    <div class="grid grid-cols-3 gap-4">
        <TextInput
            placeholder="Business Name or Document Number"
            v-model="businessName"
            @input="debouncedEmitInput">
        </TextInput>
    </div>
</template>