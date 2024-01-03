export interface Trailer {
    id: number;
    truck_id?: number;
    width: string;
    registration_renewal_date: Date|string; //
    notes: string;
    model_year: string;
    length: string;
    out_of_service_date: Date|string;
    asset_owner: string;
    capacity: string;
    annual_inspection_date: Date|string; //
    height: string;
    vin_number: string;
    in_service_date: Date|string; //
    brand: string;
    preventive_maintenance_date: Date|string;
    carrier_id?: number;
    unit_number: string;
    model: string;
    color: string;
    trailer_id?: number; //
    updated_date: Date|string;
    plate: string;
    ownership_type: string;
    equipment_type: string
    equipment_weight: number
    status?: string;
    [x: string]:any;

}
