import axios from "axios";

export async function getSubscriptions(pageNumber?: number) {
    const url = '/base-url/api/subscriptions';
    const response = await axios
        .get(url, {
            params: {
                page: pageNumber,
            }
        });

    return response;
}

export async function createSubscription(form: Object) {
    const url = '/base-url/api/subscriptions';
    const response = await axios.post(url, form);

    return response;
}