export interface RecapturedHoursDetails {
    id: number
    carrier_id: number
    driver_id: number
    vehicle_id: number
    driver_name: string
    driver_caption: string
    cycle_today: string
    cycle_tomorrow: string
    day_1_recaptured_date: string|Date
    day_2_recaptured_date: string|Date
    day_3_recaptured_date: string|Date
    day_4_recaptured_date: string|Date
    day_5_recaptured_date: string|Date
    day_6_recaptured_date: string|Date
    duty_status: string
    updated_date: string|Date

  }
