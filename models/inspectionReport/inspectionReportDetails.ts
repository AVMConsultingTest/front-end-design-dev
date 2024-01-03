export interface InspectionReportDetails {
    id: number|any;
    driver_id: number|string;
    category?: string|any;
    date?: Date|string|any;
    state?: string|any;
    report_number?: string|any;
    upload_document?: string|any;
    inspection_level?: number|string|any;
    driver_name:string;
    dot_asset_id?: string|any;
    violation_group?: string|any;
    description?: string|any;
    violations_count?:number|string|any;
    sequence: number|string ;
    out_of_service: string;
    violation_severity: number|string;
    oos_violation_severity: number|string;
    total_violation_severity: number|string;
    time_weight: number|string;
    total_points: number|string;
    [x: string]: string|number|Date;
}
