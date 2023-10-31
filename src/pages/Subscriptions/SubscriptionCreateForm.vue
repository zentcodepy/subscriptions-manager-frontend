<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref } from 'vue';
import { CreateSubscriptionData } from '../../types/Subscriptions/CreateSubscriptionData';
import router from '../../router';
import { createSubscription, getServicesOptions } from '../../services/SubscriptionService';
import InputLabel from '../../components/common/InputLabel.vue';
import TextInputWithLabel from '../../components/common/TextInputWithLabel.vue';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import VueMultiselect from 'vue-multiselect';
import InputRadio from '../../components/common/InputRadio.vue';

// TODO:Check if user is logged in

const form = ref<CreateSubscriptionData>({
    service: {},
    service_id: null,
    automatic_notification_enabled: false,
    date_from: '',
    duration_in_months: 0,
    grace_period_in_days: 0,
    total_amount: '',
    payment_service_type: '',
});

const formTitle = 'Create Subscription';

let servicesOptions = ref([]);

getServicesOptionsForSelect();

function getServicesOptionsForSelect() {
    getServicesOptions('')
    .then((response) => {
        if (response.status == 200) {
            servicesOptions.value = response.data.data;
        }
    })
    .catch(function (error) {
        console.log(error)
        alert("Error");
    })
}

function submit() {
    form.value.service_id = form.value.service.id;
    createSubscription(form.value)
    .then((response) => {
        if (response.status == 201) {
            router.push('/subscriptions');
        } else {
            console.log(response);
            alert('Error');
        }
    })
    .catch(function (error) {
        console.log(error);
        if (error.response != undefined && error.response.data != undefined) {
            alert(error.response.data.message)
        } else {
            alert("Error");
        }
    });
}
</script>
<template>
    <AppLayout>
        <form class="m-5" @submit.prevent="submit">
            <div class="space-y-12">

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>

                    <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Date from -->
                        <div class="sm:col-span-2">
                            <TextInputWithLabel inputId="date_from" v-model="form.date_from" label="Date from"
                                inputType="date" />
                        </div>
                        <!-- Duration in months -->
                        <div class="sm:col-span-2">
                            <label
                                class="block text-sm font-medium leading-6 text-gray-900"
                                for="duration_in_months"
                            >
                                Duration in months
                            </label>
                            <input
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                type="number"
                                id="duration_in_months"
                                v-model="form.duration_in_months"
                                min=0
                            >
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Service -->
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-medium leading-6 text-gray-900">
                                Service
                            </label>
                            <VueMultiselect 
                                v-model="form.service"
                                label="name"
                                placeholder="Select"
                                track-by="id"
                                :options="servicesOptions">
                            </VueMultiselect>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Grace period in days -->
                        <div class="sm:col-span-2">
                            <label
                                class="block text-sm font-medium leading-6 text-gray-900"
                                for="grace_period_in_days"
                            >
                                Grace Period In Days
                            </label>
                            <input
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                type="number"
                                id="grace_period_in_days"
                                v-model="form.grace_period_in_days"
                                min=0
                            >
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Total amount -->
                        <div class="sm:col-span-2">
                            <TextInputWithLabel inputId="total_amount" v-model="form.total_amount" label="Total amount"
                                inputType="number" />
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Payment Service Type -->
                        <div class="sm:col-span-2">
                            <InputLabel text="Payment Service Type" />
                            <div class="mt-2">
                                <InputRadio
                                    input-id="manual"
                                    input-name="payment_service_type"
                                    label="Manual"
                                    value="manual"
                                    v-model="form.payment_service_type"
                                />
                            </div>
                            <div class="mt-2">
                                <InputRadio
                                    input-id="metrepay"
                                    input-name="payment_service_type"
                                    label="Metrepay"
                                    value="metrepay"
                                    v-model="form.payment_service_type"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Automatic notification enabled -->
                        <div class="sm:col-span-2">
                            <input 
                                type="checkbox"
                                id="automatic_notification_enabled"
                                name="automatic_notification_enabled"
                                v-model="form.automatic_notification_enabled"
                            >
                            <label for="automatic_notification_enabled"> Automatic notification enabled</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-start gap-x-6">
                <PrimaryButton title="Save"></PrimaryButton>
            </div>
        </form>
    </AppLayout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>