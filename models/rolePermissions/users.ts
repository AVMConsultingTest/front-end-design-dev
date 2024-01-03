export interface Company{
    name: string
}

export interface users{
    id: number
    first_name: string
    last_name: string
    email: string
    username: string
    role: string
    job_title: string
    address_line1: string
    address_line2: string
    state: string
    city: string
    zip_code: string
    country: string
    phone_number: any
    fax_number: any
    thirt_party_access: any
    image: any
    is_owner: boolean
    is_password_changed: boolean
    refresh_token: string
    company_id: number
    user_roles: any[]
    company: Company
}
