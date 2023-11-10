<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref } from 'vue';
import { CreateSubscriptionData } from '../../types/Subscriptions/CreateSubscriptionData';
import router from '../../router';
import { createSubscription, getServicesOptions } from '../../services/SubscriptionService';
import TextInputWithLabel from '../../components/common/TextInputWithLabel.vue';
import PaymentServiceTypeSelection from '../Subscriptions/Partials/PaymentServiceTypeSelection.vue';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import VueMultiselect from 'vue-multiselect';
import NumericInput from '../../components/common/NumericInput.vue';
import CheckboxInput from '../../components/common/CheckboxInput.vue';

// TODO:Check if user is logged in

const form = ref<CreateSubscriptionData>({
    service_id: null,
    automatic_notification_enabled: false,
    date_from: '',
    duration_in_months: "0",
    grace_period_in_days: "0",
    total_amount: '',
    payment_service_type: '',
});

const formTitle = 'Create Subscription';

let servicesOptions = ref([]);
let selectedService = ref();

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

function formatData() {
    form.value.service_id = selectedService.value.id;
}

function submit() {
    formatData();
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
        <div class="mx-auto max-w-2xl text-center pt-5">
            <h2 class="text-2xl font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>
        </div>

        <form class="mx-auto max-w-xl sm:mt-10" @submit.prevent="submit">
            <div>
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <!-- Date from -->
                    <div>
                        <TextInputWithLabel inputId="date_from" v-model="form.date_from" label="Date from"
                            inputType="date" />
                    </div>
                    <!-- Duration in months -->
                    <div>
                        <NumericInput
                            input-id="duration_in_months"
                            v-model="form.duration_in_months"
                            label="Duration in months"
                            :min-value="0"
                        />
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <!-- Service -->
                    <div class="sm:col-span-2">
                        <label class="block text-sm font-medium leading-6 text-gray-900">
                            Service
                        </label>
                        <VueMultiselect 
                            v-model="selectedService"
                            label="name"
                            placeholder="Select"
                            track-by="id"
                            :options="servicesOptions">
                        </VueMultiselect>
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <!-- Grace period in days -->
                    <div class="sm:col-span-2">
                        <NumericInput
                            input-id="grace_period_in_days"
                            v-model="form.grace_period_in_days"
                            label="Grace Period In Days"
                            :min-value="0"
                        />
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <!-- Total amount -->
                    <div class="sm:col-span-2">
                        <NumericInput
                            input-id="total_amount"
                            v-model="form.total_amount"
                            label="Total amount"
                            :min-value="0"
                        />
                    </div>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <PaymentServiceTypeSelection
                        v-model="form.payment_service_type" 
                    />
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <!-- Automatic notification enabled -->
                    <div class="sm:col-span-2">
                        <CheckboxInput 
                            inputId="automatic_notification_enabled"
                            v-model="form.automatic_notification_enabled"
                            label="Automatic notification enabled"
                        />
                    </div>
                </div>
            </div>

            <div class="my-6 flex items-center justify-start gap-x-6">
                <PrimaryButton title="Save"></PrimaryButton>
            </div>
        </form>
    </AppLayout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>