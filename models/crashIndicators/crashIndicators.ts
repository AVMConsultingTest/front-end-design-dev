export interface CrashIndicators {
    driver_id: number;
    violation_report_number?: string;
    violation_state?: string;
    tow_away?: string;
    violation_count?: number;
    violation_category?: string;
    inspection_level?: number;
    out_of_service?: string;
    total_points?: number;
    violation_fatality?: string;
    hazmat_release?: number;
    total_violation_severity?: number;
    violation_severity?: number;
    carrier_id?: number;
    driver_name?: string;
    time_weight?: number;
    violation_date?: Date;
    violation_sequence?: number;
    oos_violation_severity?: number;
    violation_description?: string;
    updated_date?: Date;
    fmcsa_determination?: string;
    vehicle_id?: number;
    [x: string]: any;
}
