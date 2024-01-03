import { FuelReport } from '~/models/accounting/fuelReport'

const fuelReport:Array<FuelReport> = [
  {
    id: 1,
    carrier_id: 3,
    cash_advance_amount: 4250,
    driver_id: 4,
    report_start_date: '02-04-2023',
    comments: 'Test comments',
    card_number: 'A254B19',
    invoice_period_start_date: '10-12-2022',
    report_end_date: '07-04-2023',
    fuel_amount: 5600,
    updated_date: '01-02-2023',
    invoice_period_end_date: '24-12-2022',
    merchandise_amount: 1450,
    documents: {},
    driver_name: 'Gregor',
    driver_type: 'Lease Driver'
  },
  {
    id: 2,
    carrier_id: 3,
    cash_advance_amount: 3158,
    driver_id: 5,
    report_start_date: '09-04-2023',
    comments: 'Test comments',
    card_number: 'A254C27',
    invoice_period_start_date: '10-12-2022',
    report_end_date: '12-04-2023',
    fuel_amount: 4215,
    updated_date: '01-02-2023',
    invoice_period_end_date: '24-12-2022',
    merchandise_amount: 1025,
    documents: {},
    driver_name: 'Richard',
    driver_type: 'Owner Operator'
  }
]

export default fuelReport
