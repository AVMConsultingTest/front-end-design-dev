import { InvoiceBoardDetails } from '~/models/accounting/invoiceBoard/invoiceBoardDetails'

const invoiceBoardDetails:Array<InvoiceBoardDetails> = [
  {
    id: 1,
    load_complete_date: '02-04-2023',
    driver_id: 4,
    load_id: 5,
    broker_id: 3,
    broker_name: 'Leonard Cache',
    payout: 1200,
    billing: 'Yes',
    carrier_id: 3,
    driver_name: 'Michael Chris',
    factoring_payment: 'Card',
    invoice_id: 10,
    updated_date: '10-04-2023',
    invoice_status: 'Open'
  },
  {
    id: 2,
    load_complete_date: '06-11-2023',
    driver_id: 5,
    load_id: 6,
    broker_id: 3,
    broker_name: 'John Hawking',
    payout: 1200,
    billing: 'Yes',
    carrier_id: 3,
    driver_name: 'Bill Sanders',
    factoring_payment: 'Card',
    invoice_id: 11,
    updated_date: '10-04-2023',
    invoice_status: 'In-dispute'
  }
]

export default invoiceBoardDetails
