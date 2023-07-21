<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import axios from 'axios';
import { ref } from 'vue';

let customers = ref([]);

const url = '/base-url/api/customers';
axios
    .get(url)
    .then((response) => {
        if (response.status == 200) {
            customers.value = response.data['data'];
        }
    })
    .catch((error) => {
        console.log(error)
    });
</script>
<template>
    <AppLayout>
        <div class="m-5">
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
                    <tr v-for="customer in customers">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ customer.business_name }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ customer.document_number }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </AppLayout>
</template>