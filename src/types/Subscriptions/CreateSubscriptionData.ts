export interface CreateSubscriptionData {
    service_id: string | null,
    automatic_notification_enabled: Boolean,
    date_from: string,
    duration_in_months: Number,
    grace_period_in_days: Number,
    total_amount: string,
    payment_service_type: string,
}