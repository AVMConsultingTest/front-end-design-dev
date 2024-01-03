export interface DevicesDetails {
    id: number;
    device_name: string;
    notes: string;
    imei_number: string;
    activation_number: string;
    device_type: string;
    updated_date: Date|string;
    truck_id: number|string;
    service_end_date?: Date|string;
    service_start_date?: Date|string;
    device_returned_date?: Date|string;
    vendor?: string;
    [x: string]: any;

}

export type DeviceUpdateRequest = Pick<DevicesDetails, 'id' | 'truck_id' | 'device_type' | 'vendor' | 'service_start_date' | 'service_end_date' | 'device_returned_date' | 'notes' > // alt 1
export interface IDeviceUpdateRequest {
    id: number; // deleting in baseservice
    type: string
    vendor: string
    service_start_date: string
    service_end_date: string
    returned_date: string
    notes: string
} // alt2
