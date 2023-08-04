<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Customer } from '../../types/Customer';
import { Pagination } from '../../types/Pagination';
import CustomerFilters from './Partials/CustomerFilters.vue';
import ListPagination from '../../components/common/ListPagination.vue';
import Spinner from '../../components/common/Spinner.vue';
import { getCustomers } from '../../services/CustomerService.ts';

let paginationData = ref<Pagination>({
    from: 0,
    to: 0,
    total: 0,
    currentPage: 0,
    pagesNumber: 0,
});
const router = useRouter();
const showLoading = ref<boolean>(false);
let customers = ref<Customer[]>([]);

onMounted(() => {
    fetchCustomers()
});

function fetchCustomers(inputValue?: string, pageNumber?: number) {
    showLoading.value = true;
    getCustomers(inputValue, pageNumber)
        .then((response) => {
            showLoading.value = false;
            if (response.status == 200) {
                const { data, meta } = response.data;
                customers.value = data;
                setPaginationData(meta);
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

function setPaginationData(meta: any) {
    paginationData.value.from = meta.from;
    paginationData.value.to = meta.to;
    paginationData.value.total = meta.total;
    paginationData.value.currentPage = meta.current_page;
    paginationData.value.pagesNumber = meta.last_page;
}

function noCustomers() {
    // if loading spinner is showing hide nocustomers message
    return showLoading.value ? false : customers.value.length === 0;
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
                :pagination-data="paginationData"
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