import { describe, expect, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import SubscriptionCreateForm from '../../pages/Subscriptions/SubscriptionCreateForm.vue';
import axios from "axios";

vi.mock("axios");

(axios as any).post.mockResolvedValue({
    status: 201,
});

(axios as any).get.mockResolvedValue({
    status: 200,
    data: {
        data: [
            {
                id: 1,
                name: 'Service 1',
            },
            {
                id: 2,
                name: 'Service 2',
            },
            {
                id: 3,
                name: 'Service 3',
            },
        ]
    }
});

describe("Subscription Create Form", () => {
    test("Submit Subscription Create Form", async () => {
        const wrapper = mount(SubscriptionCreateForm, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            }
        });
        await flushPromises();

        const form = wrapper.find('form');
        form.find('input[id="date_from"').setValue("2023-11-07");
        form.find('input[id="duration_in_months"]').setValue(2);
        form.find('input[id="grace_period_in_days"]').setValue(0);
        form.find('input[id="total_amount"]').setValue(400000);
        form.find('input[id="manual"]').setValue(true);
        form.find('input[id="automatic_notification_enabled"]').setValue(false);
        wrapper.vm.selectedService = wrapper.vm.servicesOptions[0];

        form.trigger("submit.prevent");

        expect(axios.post).toHaveBeenCalledWith("/base-url/api/subscriptions", {
            "date_from": "2023-11-07",
            "duration_in_months": "2",
            "grace_period_in_days": "0",
            "total_amount": "400000",
            "payment_service_type": "manual",
            "automatic_notification_enabled": false,
            "service_id": 1,
        });

    })
})