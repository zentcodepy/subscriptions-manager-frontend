import { describe, expect, it, test, vi } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { Customer } from "../types/Customer.js";
import axios from "axios";
import List from "../pages/Customers/List.vue";

vi.mock("axios");

function getCustomerMock() {
    return {
        'data': 
        [
            { id: 1, business_name: "Company 1", document_number: "111000-1" },
            { id: 2, business_name: "Company 2", document_number: "222000-1" },
        ]
    };
};

describe("Customer List", () => {
    test("Mounts properly", async () => {
        const customersMock: Customer[] = getCustomerMock();

        (axios as any).get.mockResolvedValue({
            data: customersMock,
        });

        const wrapper = mount(List, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        expect(wrapper).toBeTruthy();
    });
    test("Renders a table element", async() => {
        const customersMock: Customer[] = getCustomerMock();

        (axios as any).get.mockResolvedValue({
            data: customersMock,
        });

        const wrapper = mount(List, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        const table = wrapper.find('table').element;

        expect(table).toBeTruthy();
    });
});