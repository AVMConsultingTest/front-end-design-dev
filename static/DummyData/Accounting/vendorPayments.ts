import { VendorPaymentsDetails } from '~/models/accounting/vendorPayments/vendorPaymentsDetails'

const vendorPaymentsDetails:Array<VendorPaymentsDetails> = [
  {
    id: 1,
    carrier_id: 3,
    notes: 'Test',
    contract_id: 'B1450',
    payment_amount: 1452,
    asset_id: 1,
    scheduled_date: '04-09-2023',
    payment_category: 'Truck',
    updated_date: '04-04-2023',
    payment_method: 'Wire'
  },
  {
    id: 2,
    carrier_id: 3,
    notes: 'Test',
    contract_id: 'B1450',
    payment_amount: 1080,
    asset_id: 2,
    scheduled_date: '10-09-2023',
    payment_category: 'Office Building',
    updated_date: '04-04-2023',
    payment_method: 'ACH'
  }
]

export default vendorPaymentsDetails
