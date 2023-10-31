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

// TODO:Check if user is logged in

const form = ref<CreateSubscriptionData>({
    service: {},
    service_id: null,
    date_from: '',
    date_to: '',
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
    console.log(form.value);
    // createSubscription(form.value);
    // .then((response) => {
    //     if (response.status == 201) {
    //         router.push('/subscriptions');
    //     } else {
    //         console.log(response);
    //         alert('Error');
    //     }
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     if (error.response != undefined && error.response.data != undefined) {
    //         alert(error.response.data.message)
    //     } else {
    //         alert("Error");
    //     }
    // });
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
                        <!-- Date to -->
                        <div class="sm:col-span-2">
                            <TextInputWithLabel inputId="date_to" v-model="form.date_to" label="Date to" inputType="date" />
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
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    type="radio"
                                    id="manual"
                                    name="payment_service_type"
                                    value="manual"
                                    v-model="form.payment_service_type">
                                <label
                                    class="ml-2 font-medium text-sm"
                                    for="manual">
                                    Manual
                                </label>
                            </div>
                            <div class="mt-2">
                                <input
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                    type="radio"
                                    id="metrepay"
                                    name="payment_service_type"
                                    value="metrepay"
                                    v-model="form.payment_service_type">
                                <label
                                    class="ml-2 font-medium text-sm"
                                    for="metrepay">
                                    Metrepay
                                </label>
                            </div>
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