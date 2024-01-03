export interface VehiclesMaintenance {
    id: number;
    driver_id: number;
    oos_flag: string;
    oos_date: Date;
    violation_category: string;
    oos_points: number;
    driver_points: number;
    vehicle_vin: string;
    carrier_points: number;
    report_id: string;
    violation_code: string;
    violation_description: string;
    updated_date: Date;
    vehicle_id: number;
    is_driver_responsible: string;
}
