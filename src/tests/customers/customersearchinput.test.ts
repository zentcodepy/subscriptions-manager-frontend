import { describe, expect, it, test, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils";
import { SearchCustomerData } from "../../types/Customers/SearchCustomerData";
import axios from "axios";
import CustomerSearchInput from "../../components/Customers/CustomerSearchInput.vue";
import VueMultiselect from 'vue-multiselect';

vi.mock("axios");

function getCustomersMockData() {
    return [
        { id: 1, business_name: "Company 1", document_number: "111000-1" },
        { id: 2, business_name: "Company 2", document_number: "222000-1" },
    ];
}

const customersMockData: SearchCustomerData[] = getCustomersMockData();

(axios as any).get.mockResolvedValue({
    status: 200,
    data: {data: customersMockData},
});

describe("Customer Search Input", () => {
    test("Input search working async", async () => {
        const wrapper = mount(CustomerSearchInput, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });
        await flushPromises();

        const vueMultiselect = wrapper.findComponent(VueMultiselect);
        const input = vueMultiselect.find("input");
        await input.setValue("AD");
        await input.trigger("keydown.enter");

        expect(axios.get).toHaveBeenCalledTimes(1);

        expect(axios.get).toHaveBeenCalledWith("/base-url/api/customers/search", {
            params: {
                search: "AD",
            },
        });

        expect(vueMultiselect.vm.options).toStrictEqual(customersMockData);

        console.log(vueMultiselect.vm.options);

        // expect(rows).toHaveLength(2);
        // expect(headerColumns[0].text()).toBe('Business Name');
        // expect(headerColumns[1].text()).toBe('Document Number');
        // expect(headerColumns[2].text()).toBe('Actions');
        // expect(ColumnsOfFirstRow[0].text()).toBe('Company 1');
        // expect(ColumnsOfFirstRow[1].text()).toBe('111000-1');
    });
});
