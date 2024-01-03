import { InvoicingDetails } from '~/models/accounting/invoicingDetails/invoicingDetails'

const invoicingDetails:Array<InvoicingDetails> = [
  {
    id: 1,
    carrier_id: 3,
    broker_id: 3,
    driver_id: 2,
    load_id: 1,
    invoice_id: 2,
    invoice_date: '04-08-2023',
    trip_id: 10,
    documents: 'T10',
    broker_name: 'John',
    driver_name: 'Cameron',
    load_complete_date: '10-07-2023',
    gross_pay: 21,
    notes: 'Test',
    delivery_status: 'Active',
    invoice_start_date: '10-07-2023',
    invoice_end_date: '11-07-2023',
    invoice_start_time: '14:10',
    invoice_end_time: '15:40',
    invoice_origin: 'Origin',
    invoice_destination: 'Hawaii',
    miles: 120,
    contract_id: null,
    updated_date: '02-04-2023'
  },
  {
    id: 2,
    carrier_id: 3,
    broker_id: 3,
    driver_id: 2,
    load_id: 2,
    invoice_id: 4,
    invoice_date: '04-08-2023',
    trip_id: 10,
    documents: 'T10',
    broker_name: 'Chris',
    driver_name: 'Leonard',
    load_complete_date: '11-05-2023',
    gross_pay: 16,
    notes: 'Test',
    delivery_status: 'Active',
    invoice_start_date: '10-07-2023',
    invoice_end_date: '11-07-2023',
    invoice_start_time: '10:35',
    invoice_end_time: '17:05',
    invoice_origin: 'Origin',
    invoice_destination: 'Hawaii',
    miles: 120,
    contract_id: null,
    updated_date: '02-04-2023'
  }
]

export default invoicingDetails
