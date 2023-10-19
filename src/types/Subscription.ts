export interface Subscription {
    id: number,
    service_name: string,
    date_from: string,
    date_to: string,
    total_amount: number,
    status: string,
    payment_service_type: string,
}