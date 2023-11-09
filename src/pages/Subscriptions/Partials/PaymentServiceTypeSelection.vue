<script setup lang="ts">
import InputLabel from '../../../components/common/InputLabel.vue';
import InputRadio from '../../../components/common/InputRadio.vue';

const emit = defineEmits(['update:modelValue']);

function selection(valueSelected: any) {
    emit('update:modelValue', valueSelected);
}
</script>
<template>
        <div class="sm:col-span-2">
            <InputLabel text="Payment Service Type" />
            <div class="mt-2">
                <InputRadio
                    input-id="manual"
                    input-name="payment_service_type"
                    label="Manual"
                    value="manual"
                    @update:model-value="selection"
                />
            </div>
            <div class="mt-2">
                <InputRadio
                    input-id="metrepay"
                    input-name="payment_service_type"
                    label="Metrepay"
                    value="metrepay"
                    @update:model-value="selection"
                />
            </div>
        </div>
</template>