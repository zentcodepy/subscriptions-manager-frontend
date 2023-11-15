import axios from "axios";
import { status_options } from "../utils/constants/subscriptionsConstants";

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

export async function getSubscription(subscriptionId: string) {
    const url = '/base-url/api/subscriptions/' + subscriptionId;
    const response = await axios
        .get(url);
    
    return response;
}

export async function getServicesOptions(search: string) {
    const url = '/base-url/api/service/search';
    const response = await axios
        .get(url, {
            params: {
                search: search,
            }
        });

    return response;
}

export function getStatusOptions() {
    return status_options;
}

export async function createSubscription(form: Object) {
    const url = '/base-url/api/subscriptions';
    const response = await axios.post(url, form);

    return response;
}

export async function updateSubscription(subscriptionId: string, form: Object) {
    const url = '/base-url/api/subscriptions/' + subscriptionId;
    const response = await axios.put(url, form);

    return response;
}