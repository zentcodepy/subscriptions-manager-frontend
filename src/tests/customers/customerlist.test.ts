import { describe, expect, it, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import { ListCustomerData } from "../../types/Customers/ListCustomerData";
import axios from "axios";
import List from "../../pages/Customers/List.vue";

vi.mock("axios");

function getCustomerMock() {
    return {
        'data':
            [
                { id: 1, business_name: "Company 1", document_number: "111000-1" },
                { id: 2, business_name: "Company 2", document_number: "222000-1" },
            ]
    };
}

const customersMock: { 'data': ListCustomerData[] } = getCustomerMock();

(axios as any).get.mockResolvedValue({
    status: 200,
    data: customersMock,
});

describe("Customer List", () => {
    test("Renders data inside table", async () => {
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

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(rows).toHaveLength(2);
        expect(headerColumns[0].text()).toBe('Business Name');
        expect(ColumnsOfFirstRow[0].text()).toBe('Company 1');
        expect(ColumnsOfFirstRow[1].text()).toBe('111000-1');
    });
});
