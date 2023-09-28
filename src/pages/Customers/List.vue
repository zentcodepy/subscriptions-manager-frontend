<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref, onMounted } from 'vue';
import { Customer } from '../../types/Customer';
import { Pagination } from '../../types/Pagination';
import CustomerFilters from './Partials/CustomerFilters.vue';
import ListPagination from '../../components/common/ListPagination.vue';
import { getCustomers } from '../../services/CustomerService.ts';

const paginationData = ref<Pagination>({
    from: 0,
    to: 0,
    total: 0,
    currentPage: 0,
    pagesNumber: 0,
});
const customers = ref<Customer[]>([]);

onMounted(() => {
    fetchCustomers()
});

function fetchCustomers(inputValue?: string, pageNumber?: number) {
    getCustomers(inputValue, pageNumber)
        .then((response) => {
            if (response.status == 200) {
                const { data, meta } = response.data;
                if (meta != undefined) {
                    setPaginationData(meta);
                }
                customers.value = data;
            }
        })
        .finally(() => {
        })
}

function setPaginationData(meta: any) {
    paginationData.value.from = meta.from;
    paginationData.value.to = meta.to;
    paginationData.value.total = meta.total;
    paginationData.value.currentPage = meta.current_page;
    paginationData.value.pagesNumber = meta.last_page;
}

function noCustomers() {
    return customers.value == undefined || customers.value.length == 0;
}

function nextPage() {
    const pageNumber = paginationData.value.currentPage + 1;
    if (pageNumber <= paginationData.value.pagesNumber) {
        fetchCustomers('', pageNumber);
    }
}

function previousPage() {
    const pageNumber = paginationData.value.currentPage - 1;
    if (pageNumber > 0) {
        fetchCustomers('', pageNumber);
    }
}
</script>
<template>
    <AppLayout>
        <div class="m-5">
            <div class="text-right mr-5">
                <router-link 
                    to="customers/create" 
                    class="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-3 py-2 text-sm font-medium">
                    Create Customer
                </router-link>
            </div>
            <CustomerFilters
                class="m-5"
                @input-emitted="fetchCustomers"
            />
            <ListPagination
                :pagination-data="paginationData"
                @page-number-emitted="fetchCustomers('', $event)"
                @next-page-emitted="nextPage()"
                @previous-page-emitted="previousPage()"
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