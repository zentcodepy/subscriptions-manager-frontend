import { describe, expect, test, vi } from "vitest";
import { ListServiceData } from "../../types/Services/ListServiceData";
import { getServices } from "../../services/ServiceService";
import axios from "axios";

vi.mock("axios");

function getServicesMockData() {
  return [
    { id: 1, name: "Service 1", status: "Active", customer_name: "Company A" },
    { id: 2, name: "Service 2", status: "Cancelled", customer_name: "Company B" },
  ];
};

describe("Service Service", () => {
  test("makes a GET request to fetch services", async () => {
    const servicesMockData: ListServiceData[] = getServicesMockData();

    (axios as any).get.mockResolvedValue({
      data: servicesMockData,
    });

    const services = await getServices();

    expect(axios.get).toHaveBeenCalledWith("/base-url/api/services", {
      params: {
        search: undefined,
        page: undefined,
      },
    });

    expect(services.data).toStrictEqual(servicesMockData);
  });
});
