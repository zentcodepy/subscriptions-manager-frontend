<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import VueMultiselect from 'vue-multiselect'
import {searchServices} from "../../services/CustomerService";
import {SearchCustomerData} from "../../types/Customers/SearchCustomerData";

const selected = ref('');
const customers = ref<SearchCustomerData[]>([]);

defineEmits(['update:customer-id'])

function getCustomers(search: string) {
  searchServices(search)
      .then((response) => {
        if (response.status == 200) {
          customers.value = response.data.data;
        } else {
          console.log(response);
          alert('Error');
        }
      })
}

</script>

<template>
  <label
      class="block text-sm font-medium leading-6 text-gray-900">
      Select Customer
  </label>
  <VueMultiselect
        v-model="selected"
        :options="customers"
        label="business_name"
        track-by="id"
        @search-change="getCustomers"
        @select="$emit('update:customer-id', $event.id)"
    >
    </VueMultiselect>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

