export interface DevicesSummary {
    id: number | string;
    carrier_id?: number;
    total_ezpass?: number;
    total_bestpass?: number;
    total_ipass?: number;
    updated_date?: Date|string;
    total_eld?: number;
    [x: string]: any;
}
