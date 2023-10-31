export interface CreateSubscriptionData {
    service: any,
    service_id: string | null,
    date_from: string,
    date_to: string,
    total_amount: string,
    payment_service_type: string,
}