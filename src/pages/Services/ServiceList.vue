<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref, onMounted } from 'vue';
import { ListServiceData } from '../../types/Services/ListServiceData';
import { Pagination } from '../../types/Pagination';
import ListPagination from '../../components/common/ListPagination.vue';
import { getServices } from '../../services/ServiceService';

const paginationData = ref<Pagination>({
    from: 0,
    to: 0,
    total: 0,
    currentPage: 0,
    pagesNumber: 0,
});
const services = ref<ListServiceData[]>([]);

onMounted(() => {
    fetchServices()
});

function fetchServices(inputValue?: string, pageNumber?: number) {
    getServices(inputValue, pageNumber)
        .then((response) => {
            if (response.status == 200) {
                const { data, meta } = response.data;
                if (meta != undefined) {
                    setPaginationData(meta);
                }
                services.value = data;
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

function noServices() {
    return services.value.length == 0;
}
</script>
<template>
    <AppLayout>
        <div class="m-5">
            <div class="text-right mr-5">
                <router-link 
                    to="services/create"
                    class="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-3 py-2 text-sm font-medium">
                    Create Service
                </router-link>
            </div>
            <ListPagination
                :pagination-data="paginationData"
                @page-number-emitted="fetchServices('', $event)"
                @next-page-emitted="fetchServices('', $event)"
                @previous-page-emitted="fetchServices('', $event)"
            />
            <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <template v-if="noServices()">
                        <h2 class="px-6 py-4 text-sm text-gray-900">No services found</h2>
                    </template>
                    <template v-else>
                        <tr v-for="service in services">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ service.name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ service.customer_name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ service.status }}</div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </AppLayout>
</template>
