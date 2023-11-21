import { describe, expect, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import ServiceCreateForm from "../../pages/Services/ServiceCreateForm.vue";
import CustomerSearchInput from "../../components/customers/CustomerSearchInput.vue";
import axios from "axios";

vi.mock("axios");

(axios as any).post.mockResolvedValue({
    status: 201,
});

describe("Service create form", () => {
    test("Submit ServiceCreateForm with valid data to the API", async () => {
        const wrapper = mount(ServiceCreateForm, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            }
        });
        await flushPromises();

        const form = wrapper.find('form');
        await form.find('input[id="name"]').setValue("My Service 1");
        const customerSearchWrapper = wrapper.findComponent(CustomerSearchInput);
        customerSearchWrapper.vm.$emit('update:customer-id', 5);

        await form.trigger("submit.prevent");

        expect(axios.post).toHaveBeenCalledWith("/base-url/api/services", {
            "name": "My Service 1",
            'customer_id': 5,
        });
    });
})
