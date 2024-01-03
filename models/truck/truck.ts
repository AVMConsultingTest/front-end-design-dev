export interface Truck {
    id: number;
    truck_id?: number;
    asset_owner: string;
    notes: string;
    unit_number: string;
    out_of_service_date: Date|string; //
    brand: string;
    acquisition_type: string;
    registration_renewal_date: Date|string; //
    vin_number: string;
    annual_inspection_date: Date|string; //
    color: string;
    carrier_id?: number;
    model: string;
    plate: string;
    main_driver_id?: string;
    in_service_date: Date|string; //
    preventive_maintenance_date: Date|string; //
    co_driver_id?: string;
    updated_date: Date|string;
    model_year: string;
    status?: string;
}
