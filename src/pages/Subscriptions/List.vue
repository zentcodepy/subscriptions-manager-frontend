<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref, onMounted } from 'vue';
import { Subscription } from '../../types/Subscription';
import { Pagination } from '../../types/Pagination';
import ListPagination from '../../components/common/ListPagination.vue';
import { getSubscriptions } from '../../services/SubscriptionService';

const paginationData = ref<Pagination>({
    from: 0,
    to: 0,
    total: 0,
    currentPage: 0,
    pagesNumber: 0,
});
const subscriptions = ref<Subscription[]>([]);

onMounted(() => {
    fetchSubscriptions()
});

function fetchSubscriptions(pageNumber?: number) {
    getSubscriptions(pageNumber)
        .then((response) => {
            if (response.status == 200) {
                const { data, meta } = response.data;
                if (meta != undefined) {
                    setPaginationData(meta);
                }
                subscriptions.value = data;
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

function noRegisters() {
    return subscriptions.value == undefined || subscriptions.value.length == 0;
}
</script>
<template>
    <AppLayout>
        <div class="m-5">
            <!-- <div class="text-right mr-5">
                <router-link 
                    to="subscriptions/create" 
                    class="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md px-3 py-2 text-sm font-medium">
                    Create Subscription
                </router-link>
            </div> -->
            <ListPagination
                :pagination-data="paginationData"
                @page-number-emitted="fetchSubscriptions($event)"
                @next-page-emitted="fetchSubscriptions($event)"
                @previous-page-emitted="fetchSubscriptions($event)"
            />
            <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date From
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date To
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Amount
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <template v-if="noRegisters()">
                        <h2 class="px-6 py-4 text-sm text-gray-900">No registers found</h2>
                    </template>
                    <template v-else>
                        <tr v-for="subscription in subscriptions">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ subscription.service_name }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ subscription.date_from }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ subscription.date_to }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ subscription.total_amount }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ subscription.payment_service_type }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ subscription.status }}</div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </AppLayout>
</template>