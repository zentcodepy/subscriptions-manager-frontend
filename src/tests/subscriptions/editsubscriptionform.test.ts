import { status_options } from './../../utils/constants/subscriptionsConstants';
import { describe, expect, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import SubscriptionEditForm from '../../pages/Subscriptions/SubscriptionEditForm.vue';
import axios from "axios";
import { status_options } from "../../utils/constants/subscriptionsConstants";

vi.mock("axios");

vi.mock("vue-router", async () => {
    const actual: any = await vi.importActual("vue-router")
    return {
        ...actual,
        useRoute: () => ({
            params: { subscriptionId: 1 },
        })
    }
});

(axios as any).put.mockResolvedValue({
    status: 200,
});

(axios as any).get.mockResolvedValue({
    status: 200,
    data: {
        data:
        {
            id: 1,
            status: status_options[0].id,
            service_name: "Service 1",
            date_from: "2023-01-11",
            date_to: "2023-01-12",
            grace_period_in_days: 0,
            payment_service_type: "manual",
            automatic_notification_enabled: false,
        },
    }
});

describe("Subscription Edit Form", () => {
    test("Form submit with updated data", async () => {
        const wrapper = mount(SubscriptionEditForm, { global: { stubs: ['router-view'] } })

        await flushPromises();

        const form = wrapper.find('form');
        wrapper.vm.selectedStatus = status_options[1];
        const subscriptionId = wrapper.vm.subscriptionId;

        form.trigger("submit.prevent");

        expect(axios.put).toHaveBeenCalledWith("/base-url/api/subscriptions/" + subscriptionId, {
            "id": subscriptionId,
            "status": status_options[1].id,
            "grace_period_in_days": 0,
            "payment_service_type": "manual",
            "automatic_notification_enabled": false,
        });
    })
})