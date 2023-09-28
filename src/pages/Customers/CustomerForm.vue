<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { computed, ref } from 'vue';
import { CreateCustomer } from '../../types/CreateCustomer';
import router from '../../router';
import { createCustomer, getCustomer, updateCustomer } from '../../services/CustomerService.ts';
import TextInput from '../../components/common/TextInput.vue';

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

if (router.currentRoute.value.params != undefined && router.currentRoute.value.params.customerId != undefined) {
    editForm.value = true;
    customerId.value = router.currentRoute.value.params.customerId;
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
                            <label for="business_name" class="block text-sm font-medium leading-6 text-gray-900">Business Name</label>
                            <div class="mt-2">
                                <TextInput
                                    id="business_name"
                                    v-model="form.business_name"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="document_number" class="block text-sm font-medium leading-6 text-gray-900">Document Number / RUC</label>
                            <div class="mt-2">
                                <TextInput
                                    id="document_number"
                                    v-model="form.document_number"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="contact_name" class="block text-sm font-medium leading-6 text-gray-900">Contact Name</label>
                            <div class="mt-2">
                                <TextInput
                                    id="contact_name"
                                    v-model="form.contact_name"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="phone_number" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                            <div class="mt-2">
                                <TextInput
                                    id="phone_number"
                                    v-model="form.phone_number"
                                    type="tel"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div class="mt-2">
                                <TextInput
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                            <div class="mt-2">
                                <TextInput
                                    id="address"
                                    v-model="form.address"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="comments" class="block text-sm font-medium leading-6 text-gray-900">Comments</label>
                            <div class="mt-2">
                                <TextInput
                                    id="comments"
                                    v-model="form.comments"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-start gap-x-6">
                <button
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Save
                </button>
            </div>
        </form>
    </AppLayout>
</template>