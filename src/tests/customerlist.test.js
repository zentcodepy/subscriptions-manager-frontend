import { beforeEach, describe, expect, test, vi } from "vitest";
import { getCustomers } from "../services/CustomerService.ts";
import axios from "axios";

vi.mock("axios");

describe("Customer Service", () => {
  test("makes a GET request to fetch customers", async () => {
    const customersMock = [
      { id: 1, business_name: "Company 1", document_number: "111000-1" },
      { id: 2, business_name: "Company 2", document_number: "222000-1" },
    ];

    axios.get.mockResolvedValue({
      data: customersMock,
    });

    const customers = await getCustomers();

    expect(axios.get).toHaveBeenCalledWith("/base-url/api/customers", {
      params: {
        search: undefined,
        page: undefined,
      },
    });

    expect(customers.data).toStrictEqual(customersMock);
  });

  test("makes a GET request to fetch customers with filters", async () => {
    const customersMock = [
      { id: 1, business_name: "Company 1", document_number: "111000-1" },
      { id: 2, business_name: "Company 2", document_number: "222000-1" },
    ];

    axios.get.mockResolvedValue({
      data: customersMock,
    });

    const customers = await getCustomers("Company", 1);

    expect(axios.get).toHaveBeenCalledWith("/base-url/api/customers", {
      params: {
        search: "Company",
        page: 1,
      },
    });

    expect(customers.data).toStrictEqual(customersMock);
  });
});
