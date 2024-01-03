export interface AccidentsStatus{
    accident_status: 'open' | 'close'
}
export interface Accidents {
    id: number;
    carrier_id: number;
    driver_id: number;
    truck_id: number;
    report_date: string;
    report_number: string;
    report_state: string;
    fatal?: string;
    injury: string;
    tow: string;
    haz_mat: string;
    notes?: string;
    driver_name: string;
    driver_license_number: string;
    driver_license_state: string;
    truck_plate_number: string;
    truck_plate_state: string;
}
