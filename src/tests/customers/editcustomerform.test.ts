import { describe, expect, test, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CustomerForm from "../../pages/Customers/CustomerForm.vue";

// vi.mock('vue-router', () => ({
//     useRoute: () => ({
//         params: { customerId: 1 },
//     }),
// }));

describe("Edit customer form", () => {
    test("Update CustomerForm with valid data to the API", () => {
        // shallowMount(CustomerForm, { global: { stubs: ['router-view'] } })
    });
})