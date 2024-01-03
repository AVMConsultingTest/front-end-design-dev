export interface InspectionsDetails {
    id: number;
    category: string
    date: string
    state: string
    report_number: string
    inspection_level: number
    violation_group: string
    description: string
    violations_count: number
    sequence: number
    out_of_service: string
    violation_severity: number
    oos_violation_severity: number
    total_violation_severity: number
    time_weight: number
    total_points: number
    driver_id: number
}
