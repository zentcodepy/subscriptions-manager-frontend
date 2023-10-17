import { describe, expect, test, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import CustomerForm from "../../pages/Customers/CustomerForm.vue";
import axios from "axios";

vi.mock("axios");

(axios as any).get.mockResolvedValue({
    status: 200,
    data: {
        data: {
            id: 1,
            business_name: "Company 1",
            document_number: "Document Number 1",
            contact_name: "Contact Name 1",
            phone_number: "Phone Number 1",
            email: "Email 1",
            address: "Address 1",
            comments: "My observations"
        }
    }
        
});

(axios as any).put.mockResolvedValue({
    status: 200,
});

(axios as any).post.mockResolvedValue({
    status: 201,
});

vi.mock("vue-router", async () => {
    const actual: any = await vi.importActual("vue-router")
    return {
        ...actual,
        useRoute: () => ({
            params: { customerId: 1 },
        })
    }
});

describe("Edit customer form", () => {
    test("Form renders with customer data", async () => {
        const wrapper = mount(CustomerForm, { global: { stubs: ['router-view'] } })
        await flushPromises();

        const business_name = wrapper.find('input[id="business_name"]').element as HTMLInputElement;
        expect(business_name.value).toBe('Company 1');

        const document_number = wrapper.find('input[id="document_number"]').element as HTMLInputElement;
        expect(document_number.value).toBe('Document Number 1');

        const contact_name = wrapper.find('input[id="contact_name"]').element as HTMLInputElement;
        expect(contact_name.value).toBe('Contact Name 1');

        const phone_number = wrapper.find('input[id="phone_number"]').element as HTMLInputElement;
        expect(phone_number.value).toBe('Phone Number 1');

        const email = wrapper.find('input[id="email"]').element as HTMLInputElement;
        expect(email.value).toBe('Email 1');

        const address = wrapper.find('input[id="address"]').element as HTMLInputElement;
        expect(address.value).toBe('Address 1');

        const comments = wrapper.find('input[id="comments"]').element as HTMLInputElement;
        expect(comments.value).toBe('My observations');
    });
    test("Form submit with updated data", async () => {
        const wrapper = mount(CustomerForm, { global: { stubs: ['router-view'] } })
        await flushPromises();

        wrapper.find('input[id="business_name"]').setValue("Company 1 Updated");
        wrapper.find('input[id="document_number"]').setValue("Document Number 1 Updated");
        wrapper.find('input[id="contact_name"]').setValue("Contact Name 1 Updated");
        wrapper.find('input[id="phone_number"]').setValue("Phone Number 1 Updated");
        wrapper.find('input[id="email"]').setValue("Email 1 Updated");
        wrapper.find('input[id="address"]').setValue("Address 1 Updated");
        wrapper.find('input[id="comments"]').setValue("My observations Updated");

        const form = wrapper.find('form');

        form.trigger("submit.prevent");

        expect(axios.put).toHaveBeenCalledWith("/base-url/api/customers/1", {
            "id": 1,
            "business_name": "Company 1 Updated",
            "document_number": "Document Number 1 Updated",
            "contact_name": "Contact Name 1 Updated",
            "phone_number": "Phone Number 1 Updated",
            "email": "Email 1 Updated",
            "address": "Address 1 Updated",
            "comments": "My observations Updated"
        });
    })
})