import { ApplicantsSummary } from '~/models/applicants'

const applicantsSummary: Array<ApplicantsSummary> = [
  { pending_approvals: 26, pending_documents: 28, pending_training: 30, carrier_id: 3, id: 1 }
]

const applicantsList:Array<any> = [
  {
    id: 1,
    applicant_first_name: 'Cameron',
    applicant_last_name: 'Williamson',
    applicant_type: 'Company Driver',
    applicant_hire_date: '28/04/2022',
    birthday_date: '01/09/1982',
    applicant_state: 'New York',
    applicant_phone_number: '229 - 555 - 0109',
    applicant_address_line_1: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    applicant_emergency_phone_number: '(219) - 555 - 0114',
    applicant_routing_number: '41256481645',
    payment_type: 'Cash Payment',
    applicant_account_number: '542646751',
    applicant_email_address: 'c.williamson@gmail.com',
    number_of_pending_docs: '2 Docs',
    applicant_payment_rates: '142',
    driver_ssn: 'SSN-123839230292393',
    recurring_deductions: '1048',
    truck_id: 18373823933,
    trailer_id: 18373823933,
    cdl_number: 'CDL - 202027292',
    cdl_issue_date: 'October 31, 2022',
    cdl_expiration_date: 'December 1, 2022',
    compensation: '425',
    status: 'Completed',
    payment_rates: '1200'
  },
  {
    id: 2,
    applicant_first_name: 'John Meta',
    applicant_last_name: 'Williamson',
    applicant_type: 'Owner Operator',
    applicant_hire_date: '20/05/2022',
    applicant_state: 'California',
    birthday_date: '20/04/1986',
    applicant_routing_number: '41256481645',
    applicant_account_number: '542646751',
    applicant_phone_number: '229 - 555 - 0109',
    payment_type: 'Cash Payment',
    applicant_payment_rates: '94',
    driver_ssn: 'SSN-123839230292393',
    recurring_deductions: '1450',
    compensation: '408',
    truck_id: 18373823933,
    trailer_id: 18373823933,
    cdl_number: 'CDL - 202027292',
    cdl_issue_date: 'October 31, 2022',
    cdl_expiration_date: 'December 1, 2022',
    applicant_address_line_1: '1048 Syracuse, Connecticut 34525',
    applicant_emergency_phone_number: '(219) - 148 - 0202',
    applicant_email_address: 'john.williamson@example.com',
    number_of_pending_docs: '1 Docs',
    status: 'Completed',
    payment_rates: '1850'
  }
]

export { applicantsSummary, applicantsList }
