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
    test("Update CustomerForm with valid data to the API", async () => {
        const wrapper = mount(CustomerForm, { global: { stubs: ['router-view'] } })
        await flushPromises();

        const inputBusinessName = wrapper.find('input[id="business_name"]').element as HTMLInputElement;
        expect(inputBusinessName.value).toBe('Company 1');
    });
})