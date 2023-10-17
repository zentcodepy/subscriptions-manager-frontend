import axios from "axios";

export async function getCustomers(inputValue?: string, pageNumber?: number) {
    const url = '/base-url/api/customers';
    const response = await axios
        .get(url, {
            params: {
                search: inputValue,
                page: pageNumber,
            }
        });

    return response;
}

export async function getCustomer(customerId: string) {
    const url = '/base-url/api/customers/' + customerId;
    const response = await axios
        .get(url);

    return response;
}

export async function createCustomer(form: Object) {
    const url = '/base-url/api/customers';
    const response = await axios.post(url, form);

    return response;
}

export async function updateCustomer(customerId: string, form: Object) {
    const url = '/base-url/api/customers/' + customerId;
    const response = await axios.put(url, form);

    return response;
}