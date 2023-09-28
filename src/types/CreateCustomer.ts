export interface CreateCustomer {
    business_name: string;
    document_number: string | null;
    contact_name: string | null,
    phone_number: string | null,
    email: string | null,
    address: string | null,
    comments: string | null,
}