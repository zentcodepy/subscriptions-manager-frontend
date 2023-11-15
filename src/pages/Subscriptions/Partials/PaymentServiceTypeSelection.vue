<script setup lang="ts">
import InputLabel from '../../../components/common/InputLabel.vue';
import InputRadio from '../../../components/common/InputRadio.vue';
import { payment_service_options } from '../../../utils/constants/subscriptionsConstants';

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
                    :input-id="payment_service_options.MANUAL.value"
                    input-name="payment_service_type"
                    :label="payment_service_options.MANUAL.label"
                    :value="payment_service_options.MANUAL.value"
                    @update:model-value="selection"
                />
            </div>
            <div class="mt-2">
                <InputRadio
                    :input-id="payment_service_options.METREPAY.value"
                    input-name="payment_service_type"
                    :label="payment_service_options.METREPAY.label"
                    :value="payment_service_options.METREPAY.value"
                    @update:model-value="selection"
                />
            </div>
        </div>
</template>