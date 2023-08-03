<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Customer } from '../../types/Customer';
import { Pagination } from '../../types/Pagination';
import CustomerFilters from './Partials/CustomerFilters.vue';
import ListPagination from '../../components/common/ListPagination.vue';
import Spinner from '../../components/common/Spinner.vue';

let paginationData: Pagination = {
    from: 0,
    to: 0,
    total: 0,
    currentPage: 0,
    pagesNumber: 0,
};
const router = useRouter();
const showLoading = ref<boolean>(false);
let customers = ref<Customer[]>([]);

fetchCustomers();

function fetchCustomers(inputValue?: string, pageNumber?: number) {
    showLoading.value = true;
    const url = '/base-url/api/customers';
    axios
        .get(url, {
            params: {
                search: inputValue,
                page: pageNumber
            }
        })
        .then((response) => {
            showLoading.value = false;
            if (response.status == 200) {
                customers.value = response.data['data'];
                paginationData.from = response.data['meta'].from;
                paginationData.to = response.data['meta'].to;
                paginationData.total = response.data['meta'].total;
                paginationData.currentPage = response.data['meta'].current_page;
                paginationData.pagesNumber = response.data['meta'].last_page;
            }
        })
        .catch((error) => {
            showLoading.value = false;
            if (error.response.status == 401 || error.response.status == 403) {
                router.push('/login');
            }
            console.log(error)
        });
}

function noCustomers() {
    if (showLoading.value) {
        return false;//still loading
    } else {
        return customers.value.length == 0 ? true : false;
    }
}
</script>
<template>
    <AppLayout>
        <div class="m-5">
            <div v-if="showLoading" class="relative">
                <Spinner class="absolute top-1/2 left-1/2" />
            </div>
            <CustomerFilters
                class="m-5"
                @input-emitted="fetchCustomers"
            />
            <ListPagination
                :from="paginationData.from"
                :to="paginationData.to"
                :total="paginationData.total"
                :current-page="paginationData.currentPage"
                :pages-number="paginationData.pagesNumber"
                @page-number-emitted="fetchCustomers('', $event)"
            />
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