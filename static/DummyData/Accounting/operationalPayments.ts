import { OperationalTransactionsDetails } from '~/models/accounting/operationalTransactions/operationalTransactionsDetails'

const operationalTransactions:Array<OperationalTransactionsDetails> = [
  {
    id: 1,
    carrier_id: 3,
    transaction_id: 'Txn ID 1',
    transaction_date: '09-09-2023',
    parent_case_tag: 'Test',
    notes: 'Test',
    vendor_id: 4,
    invoice_id: 5,
    payment_amount: 1950,
    payment_category: 'Truck',
    updated_date: '04-04-2023',
    documents: 10,
    payment_method: 'Wire'
  },
  {
    id: 2,
    carrier_id: 3,
    transaction_id: 'Txn ID 1',
    transaction_date: '09-09-2023',
    parent_case_tag: 'Test',
    notes: 'Test',
    vendor_id: 4,
    invoice_id: 5,
    payment_amount: 1950,
    payment_category: 'Office Building',
    updated_date: '04-04-2023',
    documents: 10,
    payment_method: 'ACH'
  }
]

export default operationalTransactions
