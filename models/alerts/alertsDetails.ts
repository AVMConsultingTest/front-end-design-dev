export interface AlertsDetails {
    id?: any;
    driver_id?: number;
    carrier_id?: number;
    driver_name?: string;
    status?: string;
    description?: string;
    date?: Date|string;
    updated_date?: Date|string;
    document_id?: number;
    licence_status?: string;
    [x: string]: any;
}

// export type AlertsUpdateRequest = Pick<AlertsDetails, 'id' | 'status' | 'description' | 'date' | 'licence_status' | 'driver_id' >

// export interface IAlertsUpdateRequest {
//     id: number
//     status: string
//     description: string
//     date: string
//     licence_status: string
//     driver_id: number
// }
