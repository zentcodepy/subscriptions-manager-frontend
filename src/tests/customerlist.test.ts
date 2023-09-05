import { describe, expect, it, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import { Customer } from "../types/Customer.js";
import axios from "axios";
import List from "../pages/Customers/List.vue";

vi.mock("axios");

interface CustomerIndexResponse {
    'data': Customer[];
}

function getCustomerMock() {
    return {
        'data': 
        [
            { id: 1, business_name: "Company 1", document_number: "111000-1" },
            { id: 2, business_name: "Company 2", document_number: "222000-1" },
        ]
    };
};

const customersMock: CustomerIndexResponse = getCustomerMock();

(axios as any).get.mockResolvedValue({
    status: 200,
    data: customersMock,
});

describe("Customer List", () => {

    test("Mounts properly", async () => {
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

    test("Renders data inside table", async() => {
        const wrapper = mount(List, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });
        await flushPromises();

        const table = wrapper.find('table');
        const thead = table.find('thead');
        const headerColumns = thead.findAll('th');
        const tbody = table.find('tbody');
        const rows = tbody.findAll('tr');
        
        const firstRow = rows[0];
        const ColumnsOfFirstRow = firstRow.findAll('td');
        
        expect(rows).toHaveLength(2);
        expect(headerColumns[0].text()).toBe('Business Name');
        expect(ColumnsOfFirstRow[0].text()).toBe('Company 1');
        expect(ColumnsOfFirstRow[1].text()).toBe('111000-1');
    });
});