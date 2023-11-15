export interface CreateSubscriptionData {
    service_id: string | null,
    automatic_notification_enabled: boolean,
    date_from: string,
    duration_in_months: string,
    grace_period_in_days: string,
    total_amount: string,
    payment_service_type: string,
}