export interface ApplicantsDetails {
    id: number;
    carrier_id: number;
    applicant_first_name: string;
    applicant_email_address: string;
    application_date: Date;
    updated_date: Date;
    applicant_state: string;
    birthday_date: Date|string;
    applicant_address_line_1: string;
    applicant_emergency_phone_number: string;
    applicant_last_name: string;
    number_of_pending_docs: number|string;
    applicant_type: string;
    applicant_routing_number: string;
    applicant_account_number: string;
    status: string;
    payment_type: string;
    driver_ssn: string;
    truck_id: number;
    applicant_ssn: string;
    trailer_id: number;
    cdl_number: string;
    cdl_expiration_date: Date|string;
    cdl_issue_date: Date|string;
    applicant_payment_rates: number;
    compensation: number;
    payment_rates: number;
    recurring_deductions: number;
    applicant_phone_number: string;
    applicant_hire_date?: Date;
    applicant_status?: string;
    first_name: string
    last_name: string
    type: string
    hire_date: string
    phone_number: string
    email: string

    [x: string]: unknown;
}
