export interface Driver {
  // id: number;
  // carrier_id: number
  // cdl_expiration_date: string
  // cdl_issue_date: string
  // cdl_number: string
  // cdl_state: string
  // compensation: number
  // driver_account_number: string
  // driver_address_line_1: string
  // driver_address_line_2: string
  // driver_avatar: number
  // driver_caption: string
  // driver_city: string
  // driver_contact_phone_number: string
  // driver_dob: string
  // driver_email_address: string
  // driver_emergency_phone_number: string
  // driver_emergency_phone_number_name: string
  // driver_first_name: string
  // driver_hire_date: string
  // driver_last_name: string
  // driver_pending_docs: number
  // driver_routing_number: string
  // driver_score: number
  // driver_ssn: string
  // driver_state: string
  // driver_status: string
  // driver_type: string
  // driver_zip_code: string
  // employee_id: string
  // employee_type: string
  // is_restricted: boolean | string
  // next_drug_test_date: string
  // notes: string
  // payment_rates: number
  // payment_type: string
  // recurring_deductions: number
  // restricted_notes: string
  // samba_driver_id: string
  // samba_license_id: string
  // tax_form: string
  // trailer_id: number
  // truck_id: number
  // twic_card: boolean | string
  // twic_card_notes: string
  // updated_date: string
  // w9_exist: boolean | string
  id: number
  avatar: number
  first_name: string
  last_name: string
  ssn: string
  dob: string
  email: string
  contact_phone_number: string
  emergency_phone_number: string
  emergency_phone_number_name: string
  type: string
  w9_exist: boolean
  is_restricted: boolean
  cdl_state: string
  cdl_number: string
  cdl_issue_date: string
  cdl_expiration_date: string
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip_code: string
  employee_id: string
  employee_type: string
  notes: string
  account_number: string
  routing_number: string
  payment_type: string
  payment_rates: number
  tax_form: string
  recurring_deductions: number
  compensation: number
  caption: string
  status: string
  score: number
  hire_date: string
  next_drug_test_date: string
  samba_id: string
  samba_license_id: string
  twic_card: boolean | string
  twic_card_notes: string
  truck_id: number
  trailer_id: number
  restricted_notes: string
  carrier_id: number
  created_at: string
  updated_at: string
}
