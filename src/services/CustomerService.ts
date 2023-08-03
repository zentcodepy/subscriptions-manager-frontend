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