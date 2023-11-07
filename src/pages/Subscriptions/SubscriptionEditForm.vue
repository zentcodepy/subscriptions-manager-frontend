<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '../../components/AppLayout.vue';
import { getStatusOptions, getSubscription, updateSubscription } from '../../services/SubscriptionService.ts';
import router from '../../router';
import { useRoute } from 'vue-router';
import VueMultiselect from 'vue-multiselect';
import PrimaryButton from '../../components/common/PrimaryButton.vue';

const form = ref<any>({
    id: null,
    status: null,
    grace_period_in_days: null,
    payment_service_type: null,
    automatic_notification_enabled: null,
});

const formTitle = 'Edit Subscription';
const route = useRoute();
const subscriptionId = ref('');
let subscriptionData = ref();
let statusOptions: any = ref([{ id: '', name: '' }]);
let selectedStatus = ref();

subscriptionId.value = route.params.subscriptionId;
getStatusOptionsData();
getSubscriptionData(subscriptionId.value);

function getStatusOptionsData() {
  statusOptions.value = getStatusOptions();
}

function getSubscriptionData(subscriptionId: string) {
    getSubscription(subscriptionId)
        .then((response) => {
            if (response.status == 200) {
                subscriptionData.value = response.data.data;
                selectedStatus.value = statusOptions.value.find(obj => obj.id === subscriptionData.value.status);
                setFormValues();
            } else {
                alert("error");
            }
        })
        .catch(function (error) {
            console.log(error)
            alert("Error");
        });
}

function setFormValues() {
    form.value.id = subscriptionData.value.id;
    form.value.status = subscriptionData.value.status;
    form.value.grace_period_in_days = subscriptionData.value.grace_period_in_days;
    form.value.payment_service_type = subscriptionData.value.payment_service_type;
    form.value.automatic_notification_enabled = subscriptionData.value.automatic_notification_enabled;
}

function formatData() {
    form.value.status = selectedStatus.value.id;
}

function submit() {
    formatData();
    updateSubscription(subscriptionId.value, form.value)
        .then((response) => {
            if (response.status == 200) {
                router.push('/subscriptions');
            } else {
                console.log(response);
                alert('Error');
            }
        })
        .catch(function (error) {
            console.log(error);
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
        <form class="mx-auto max-w-xl sm:mt-10" @submit.prevent="submit">
            <div class="mx-auto max-w-2xl text-center pt-5">
                <h2 class="text-2xl font-semibold leading-7 text-gray-900">{{ formTitle }}</h2>
            </div>
            <!-- Status -->
            <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">
                        Subscription
                    </label>
                    <VueMultiselect 
                        v-model="selectedStatus"
                        label="name"
                        placeholder="Select"
                        track-by="id"
                        :options="statusOptions">
                    </VueMultiselect>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-start gap-x-6">
                <PrimaryButton title="Save"></PrimaryButton>
            </div>
        </form>
    </AppLayout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
