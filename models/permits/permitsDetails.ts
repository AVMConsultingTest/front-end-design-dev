export interface PermitsDetails {
    id: number;
    truck_id: number;
    notes: string;

    // new models
    type: string
    number: string
    duration: string
    start_date: string
    end_date: string
    purchased_date: string
    cost: string
    delivery_status: string
    vendor_url: string
    installed: string

    [x: string]: string|Date|number;
}
