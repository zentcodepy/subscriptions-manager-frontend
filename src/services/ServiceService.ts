import axios from "axios";

export async function getServices(inputValue?: string, pageNumber?: number) {
    const url = '/base-url/api/services';
    return await axios
        .get(url, {
            params: {
                search: inputValue,
                page: pageNumber,
            }
        });
}

export async function getService(serviceId: string) {
    const url = '/base-url/api/services/' + serviceId;
    return await axios
        .get(url);
}

export async function createService(form: Object) {
    const url = '/base-url/api/services';
    return await axios.post(url, form);
}

export async function updateService(serviceId: string, form: Object) {
    const url = '/base-url/api/services/' + serviceId;
    return await axios.put(url, form);
}
