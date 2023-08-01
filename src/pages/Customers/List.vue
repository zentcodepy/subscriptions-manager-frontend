<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Customer } from '../../types/Customer';
import CustomerFilters from './Partials/CustomerFilters.vue';

const router = useRouter();

let customers = ref<Customer[]>([]);

const url = '/base-url/api/customers';
axios
    .get(url)
    .then((response) => {
        if (response.status == 200) {
            customers.value = response.data['data'];
        }
    })
    .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
                router.push('/login');
        }
        console.log(error)
    });

function inputSelected(inputValue: string) {
    const url = '/base-url/api/customers';
    axios
        .get(url, {
            params: {
                search: inputValue
            }
        })
        .then((response) => {
            if (response.status == 200) {
                customers.value = response.data['data'];
            }
        })
        .catch((error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                router.push('/login');
            }
            console.log(error)
        });
}

function noCustomers() {
    return customers.value.length == 0 ? true : false;
}
</script>
<template>
    <AppLayout>
        <div class="m-5">
            <CustomerFilters class="m-5" @input-emitted="inputSelected"></CustomerFilters>
            <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Business Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Document Number
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <template v-if="noCustomers()">
                        <h2 class="px-6 py-4 text-sm text-gray-900">No customers found</h2>
                    </template>
                    <template v-else>
                        <tr v-for="customer in customers">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ customer.business_name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ customer.document_number }}</div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </AppLayout>
</template>