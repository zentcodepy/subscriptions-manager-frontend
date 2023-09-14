<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref } from 'vue';
import router from '../../router';
import { createCustomer } from '../../services/CustomerService.ts';

const form = ref({
    business_name: null,
    document_number: null,
    contact_name: null,
    phone_number: null,
    email: null,
    address: null,
    comments: null
});

// TODO:Check if user is logged in
function submit() {
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
            if (error.response.data != undefined) {
                alert(error.response.data.message)
            }
        });
}

</script>
<template>
    <AppLayout>
        <form class="m-5" @submit.prevent="submit">
            <div class="space-y-12">

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Create Customer</h2>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="business_name" class="block text-sm font-medium leading-6 text-gray-900">Business Name</label>
                            <div class="mt-2">
                                <input type="text" name="business_name" id="business_name"
                                    v-model="form.business_name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="document_number" class="block text-sm font-medium leading-6 text-gray-900">Document Number / RUC</label>
                            <div class="mt-2">
                                <input type="text" name="document_number" id="document_number"
                                    v-model="form.document_number"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="contact_name" class="block text-sm font-medium leading-6 text-gray-900">Contact Name</label>
                            <div class="mt-2">
                                <input id="contact_name" name="contact_name" type="text"
                                    v-model="form.contact_name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="phone_number" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                            <div class="mt-2">
                                <input id="phone_number" name="phone_number" type="tel"
                                    v-model="form.phone_number"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <div class="mt-2">
                                <input id="email" name="email" type="email"
                                    v-model="form.email"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                            <div class="mt-2">
                                <input id="address" name="address" type="text"
                                    v-model="form.address"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="comments" class="block text-sm font-medium leading-6 text-gray-900">Comments</label>
                            <div class="mt-2">
                                <input id="comments" name="comments" type="text"
                                    v-model="form.comments"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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