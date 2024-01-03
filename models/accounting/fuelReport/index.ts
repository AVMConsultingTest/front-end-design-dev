export interface FuelReport {
    id: number
    carrier_id: number
    cash_advance_amount: number
    driver_id: number
    report_start_date: string
    comments: string
    card_number: string
    invoice_period_start_date: string
    report_end_date: string
    fuel_amount: number
    updated_date: string
    invoice_period_end_date: string
    merchandise_amount: number
    documents: {}
    driver_name: string
    driver_type: string
}
