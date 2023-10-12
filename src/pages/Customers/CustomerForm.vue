<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { computed, ref } from 'vue';
import { CreateCustomer } from '../../types/CreateCustomer';
import router from '../../router';
import { useRoute } from 'vue-router';
import { createCustomer, getCustomer, updateCustomer } from '../../services/CustomerService.ts';
import TextInputWithLabel from '../../components/common/TextInputWithLabel.vue';
import PrimaryButton from '../../components/common/PrimaryButton.vue';

// TODO:Check if user is logged in
const editForm = ref(false);
const customerId = ref('');

const form = ref<CreateCustomer>({
    business_name: '',
    document_number: '',
    contact_name: null,
    phone_number: null,
    email: null,
    address: null,
    comments: null
});

const route = useRoute();

if (route != undefined && route.params != undefined && route.params.customerId != undefined) {
    editForm.value = true;
    customerId.value = route.params.customerId;
    getCustomerData(customerId.value);
}

const formTitle = computed(() => editForm.value == true ? 'Edit Customer' : 'Create Customer');

function getCustomerData(customerId: string) {
    getCustomer(customerId)
        .then((response) => {
            if (response.status == 200) {
                form.value = response.data.data;
            } else {
                console.log(response);
                alert('Error');
            }
        })
}

function submit() {
    if (editForm.value) {
        updateCustomer(customerId.value, form.value)
        .then((response) => {
            if (response.status == 200) {
                router.push('/customers');
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
    } else {
        createCustomer(form.value)
        .then((response) => {
            if (response.status == 201) {
                router.push('/customers');
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
}
</script>
<template>
    <AppLayout>
        <form class="m-5" @submit.prevent="submit">
            <div class="space-y-12">

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="business_name"
                                v-model="form.business_name"
                                label="Business Name"
                            />
                        </div>

                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="document_number"
                                v-model="form.document_number"
                                label="Document Number / RUC"
                            />
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="contact_name"
                                v-model="form.contact_name"
                                label="Contact Name"
                            />
                        </div>

                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="phone_number"
                                v-model="form.phone_number"
                                label="Phone Number"
                                inputType="tel"
                            />
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="email"
                                v-model="form.email"
                                label="Email"
                                inputType="email"
                            />
                        </div>

                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="address"
                                v-model="form.address"
                                label="Address"
                            />
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <TextInputWithLabel
                                inputId="comments"
                                v-model="form.comments"
                                label="Comments"
                            />
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