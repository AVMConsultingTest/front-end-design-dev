export interface OperationalTransactionsDetails {
    id: number;
    carrier_id: number;
    transaction_id: string;
    transaction_date: string;
    parent_case_tag: string;
    notes: string;
    vendor_id: number;
    invoice_id: number;
    payment_amount: number;
    payment_category: string;
    updated_date: string;
    documents: number;
    payment_method: string;
  }
