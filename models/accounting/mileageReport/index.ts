export interface MileageReport {
    id: number
    carrier_id: number
    comments: string
    deadhead: number
    documents: {}
    driver_designation: string
    driver_id: number
    driver_name: string
    driver_type: string
    mileage: number
    mileage_end_date: string
    mileage_start_date: string
    report_end_date: string
    report_start_date: string
    truck_id: number
    updated_date: string
}
