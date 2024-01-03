export interface ShipmentsDetails {
    id: number;
    load_type: string;
    trailer_required: boolean;
    load_destination: string;
    cost: number;
    load_id: number;
    broker_id: number;
    equipment_type: string;
    carrier_id: number;
    pickup_date: string;
    delivery_date: string;
    revenue: number;
    max_buy_now: number;
    load_origin: string;
    customer_load_id: number;
    total_distance: number;
    accepted_date: string;
    updated_date: string;
    shipper_name: string;
    carrier_name: string;
    max_buy: number;
    load_status: string;
}
