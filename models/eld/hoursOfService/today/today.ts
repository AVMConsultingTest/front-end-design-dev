export interface TodayDetails {
    id: number
    carrier_id: number
    driver_id: number
    vehicle_id: number
    driver_name: string
    driver_caption: string
    time_in_curr_status: string
    time_until_break: string
    drive_remaining: string
    shift_remaining: string
    cycle_remaining: string
    cycle_tomorrow: string
    driving_in_violation: string
    duty_status: string
    updated_date: string|Date
  }
