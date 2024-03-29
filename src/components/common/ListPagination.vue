<script setup lang="ts">
import { Pagination } from '../../types/Pagination';

const props = defineProps({
    paginationData: {
        type: Object as () => Pagination,
        default: {
            from: 0,
            to: 0,
            total: 0,
            currentPage: 0,
            pagesNumber: 0,
        }
    }
});

const emit = defineEmits(['page-number-emitted', 'next-page-emitted', 'previous-page-emitted']);

function isCurrentPage(pageNumber: Number) {
    return pageNumber == props.paginationData.currentPage ? 'bg-indigo-600 text-white hover:text-slate-200 hover:bg-indigo-600' : '';
}

function selectPage(pageNumber: Number) {
    emit('page-number-emitted', pageNumber);
}

function previousPage() {
    const pageNumber = props.paginationData.currentPage - 1;
    if (pageNumber > 0) {
        emit('previous-page-emitted', pageNumber);
    }
}

function nextPage() {
    const pageNumber = props.paginationData.currentPage + 1;
    if (pageNumber <= props.paginationData.pagesNumber) {
        emit('next-page-emitted', pageNumber);
    }
}
</script>
<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ props.paginationData.from }}</span>
                    to
                    <span class="font-medium">{{ props.paginationData.to }}</span>
                    of
                    <span class="font-medium">{{ props.paginationData.total }}</span>
                    results
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a  
                        @click="previousPage()"
                        class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span class="sr-only">Previous</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                    <a 
                        aria-current="page"
                        class="cursor-pointer transition-colors relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="isCurrentPage(pageNumber)"
                        v-for="pageNumber in props.paginationData.pagesNumber"
                        @click="selectPage(pageNumber)"
                    >
                        {{ pageNumber }}
                    </a>
                <a  
                    @click="nextPage()"
                    class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd" />
                    </svg>
                </a>
            </nav>
        </div>
    </div>
</div></template>