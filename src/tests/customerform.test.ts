import { describe, expect, it, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import CustomerForm from "../pages/Customers/CustomerForm.vue";
import axios from "axios";

vi.mock("axios");

(axios as any).post.mockResolvedValue({
    status: 201,
});

describe("Customer form", () => {
    test("Submit CustomerForm with valid data to the API", async () => {
        const wrapper = mount(CustomerForm, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            }
        });
        await flushPromises();

        const form = wrapper.find('form');
        form.find('input[id="address"]').setValue("Miami FL 2342");
        form.find('input[id="business_name"]').setValue("Alpha Company");
        form.find('input[id="comments"]').setValue("My observations go here");
        form.find('input[id="contact_name"]').setValue("John Doe");
        form.find('input[id="document_number"]').setValue("555777-6");
        form.find('input[id="email"]').setValue("alpha@mail.com");
        form.find('input[id="phone_number"]').setValue("33323423");

        form.trigger("submit.prevent");

        expect(axios.post).toHaveBeenCalledWith("/base-url/api/customers", {
            "address": "Miami FL 2342",
            "business_name": "Alpha Company",
            "comments": "My observations go here",
            "contact_name": "John Doe",
            "document_number": "555777-6",
            "email": "alpha@mail.com",
            "phone_number": "33323423",
        });
    });
})