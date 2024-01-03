export interface AlertsSummary {
    carrier_id?: number;
    new_inspections?: number;
    outstanding_dvers?: number;
    incomplete_trainings?: number;
    updated_date?: Date|string;
    telematic_alerts?: number;
    [x: string]: any;
}
