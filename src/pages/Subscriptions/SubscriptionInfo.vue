<script setup lang="ts">
import InputLabel from '../../components/common/InputLabel.vue';

defineProps({
    subscriptionData: Object,
})
</script>
<template>
    <div class="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2 pt-5">
        <!-- Date from -->
        <div>
            <InputLabel text="Date From"/>
            <InputLabel :text="subscriptionData.date_from"/>
        </div>
        <!-- Date to -->
        <div>
            <InputLabel text="Date To"/>
            <InputLabel :text="subscriptionData.date_to"/>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1 pt-5">
        <!-- Service -->
        <div>
            <InputLabel text="Service"/>
            <InputLabel :text="subscriptionData.service_name"/>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1 pt-5">
        <!-- Customer -->
        <div>
            <InputLabel text="Customer"/>
            <InputLabel :text="subscriptionData.customer_name"/>
        </div>
    </div>
</template>