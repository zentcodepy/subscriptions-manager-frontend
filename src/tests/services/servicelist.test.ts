import { describe, expect, it, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import { ListServiceData } from "../../types/Services/ListServiceData";
import axios from "axios";
import ServiceList from "../../pages/Services/ServiceList.vue";

vi.mock("axios");

function getServicesrMockData() {
    return {
        'data':
            [
                { id: 1, name: "Service 1", status: "Active", customer_name: "Company A" },
                { id: 2, name: "Service 2", status: "Cancelled", customer_name: "Company B" },
            ]
    };
}

const servicesMockData: { 'data': ListServiceData[] } = getServicesrMockData();

(axios as any).get.mockResolvedValue({
    status: 200,
    data: servicesMockData,
});

describe("Services List", () => {
    test("Renders data inside table", async () => {
        const wrapper = mount(ServiceList, {
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
        expect(headerColumns[0].text()).toBe('Service');
        expect(headerColumns[1].text()).toBe('Customer');
        expect(headerColumns[2].text()).toBe('Status');
        expect(ColumnsOfFirstRow[0].text()).toBe('Service 1');
        expect(ColumnsOfFirstRow[1].text()).toBe('Company A');
        expect(ColumnsOfFirstRow[2].text()).toBe('Active');
    });
});
