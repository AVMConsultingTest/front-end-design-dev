export interface GenerateInvoiceDetail {
    id: number;
    invoice_end_date: string;
    driver_id: number;
    invoice_start_date: string;
    driver_type: string;
    gross: number;
    loads: number;
    deductions: number;
    miles: number;
    carrier_id: number;
    driver_name: string;
    net_pay: number;
    invoice_id: number;
    updated_date: string;
    report_date: string;
}
