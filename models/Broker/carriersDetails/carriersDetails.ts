export interface CarriersDetails {
    id: number;
    carrier_mc_number: string;
    carrier_dot_number: string;
    cargo_coverage: number;
    active_insurance: boolean | number
    broker_id: number;
    carrier_dba_name: string;
    insurance_expiration: string;
    carrier_base_state: string;
    carrier_status: string;
    updated_date: string;
    carrier_name: string;
    carrier_base_city: string;
  }
