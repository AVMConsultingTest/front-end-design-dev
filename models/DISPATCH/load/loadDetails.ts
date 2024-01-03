import { Stop } from '~/models/stops'

export interface LoadDetails {
    id: number
    status: string
    miles: any
    rate_per_mile: any
    source: string
    estimated_base_rate: any
    estimated_duration_minutes: number
    estimated_fuel_surcharge: number
    total_payout: any
    pickup_address_line1: string
    pickup_address_line2: string
    pickup_city: string
    pickup_state: string
    pickup_zip_code: string
    pickup_date: string
    drop_off_address_line1: string
    drop_off_address_line2: string
    drop_off_city: string
    drop_off_state: string
    drop_off_zip_code: string
    drop_off_date: string
    load_complete_date: any
    carrier_revenue: number
    reference_number: any
    commodity_type: any
    broker_status: any
    loading_type: string
    unloading_type: string
    is_trailer_required: any
    total_distance: any
    customer_id: any
    carrier_id: number
    broker_id: any
    dispatcher_id: number
    primary_driver_id: number
    secondary_driver_id: any
    truck_id: number
    trailer_id: number
    current_stop_id: any
    load_stops: Stop[]
    primary_driver: PrimaryDriver
    secondary_driver: SecondaryDriver
    truck?: Truck
    trailer?: Trailer
}

export interface PrimaryDriver {
    id: number
    first_name: string
    last_name: string
    email: string
  }
  
  export interface SecondaryDriver {
    id: number
    first_name: string
    last_name: string
    email: string
  }
  
  export interface Truck {
    id: number
    status: string
    brand: string
    model_year: string
    plate: string
    unit_number: string
  }
  
  export interface Trailer {
    id: number
    status: string
    brand: string
    model_year: string
    plate: string
    unit_number: string
  }