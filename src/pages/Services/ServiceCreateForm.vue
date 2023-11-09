<script setup lang="ts">
import AppLayout from '../../components/AppLayout.vue';
import { ref } from 'vue';
import { CreateServiceData } from '../../types/Services/CreateServiceData';
import router from '../../router';
import { createService } from '../../services/ServiceService';
import TextInputWithLabel from '../../components/common/TextInputWithLabel.vue';
import PrimaryButton from '../../components/common/PrimaryButton.vue';
import CustomerSearchInput from '../../components/customers/CustomerSearchInput.vue';

const form = ref<CreateServiceData>({
    name: '',
    customer_id: undefined,
});

const formTitle = 'Create Service';

function submit() {
    createService(form.value)
    .then((response) => {
        if (response.status == 201) {
            router.push('/services');
        } else {
            alert('Error');
        }
    })
    .catch(function (error) {
        if (error.response != undefined && error.response.data != undefined) {
            alert(error.response.data.message)
        } else {
            alert("Error");
        }
    });
}
</script>
<template>
    <AppLayout>
        <div class="mx-auto max-w-2xl text-center pt-5">
            <h2 class="text-2xl font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>
        </div>

        <form class="mx-auto max-w-xl sm:mt-10 px-8" @submit.prevent="submit">
            <div class="space-y-12">

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>

                    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div class="sm:col-span-2">
                            <TextInputWithLabel
                                inputId="name"
                                v-model="form.name"
                                label="Service Name"
                            />
                        </div>

                        <div class="sm:col-span-2">
                          <customer-search-input @update:customer-id="customerId => form.customer_id = customerId"></customer-search-input>
                        </div>
                    </div>

                </div>
            </div>

            <div class="mt-6 flex items-center justify-start gap-x-6">
                <PrimaryButton title="Save"></PrimaryButton>
            </div>
        </form>
    </AppLayout>
</template>
