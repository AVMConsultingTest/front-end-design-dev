export interface TollReport {
    id: number
    carrier_id: number
    driver_name: string
    driver_id: number
    driver_type: string
    report_start_date: string
    total_charges: number
    comments: string
    report_end_date: string
    updated_date: string
    unit_id: string
    prepass_id: string
}
