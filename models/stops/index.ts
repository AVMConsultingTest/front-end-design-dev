interface Stop {
    id: number
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
    payout: number
    distance: number
    weight: number
    first_name: string
    last_name: string
    email: string
    phone_number: string
    instructions: string
}

export { Stop }
