import { AssetsDetails } from '~/models/accounting/assets/assetsDetails'

const assetsDetails:Array<AssetsDetails> = [
  {
    id: 1,
    contract_id: 'AD1245',
    payment_interval: 'Monthly',
    recurring_payment: 1205,
    payoff_amount: 1350,
    payment_start_date: '02-04-2023',
    down_payment: 1450,
    acquisition_date: '07-08-2023',
    carrier_id: 3,
    number_of_payments: 120,
    vendor_id: 3,
    asset_type: 'Truck',
    acquisition_type: 'Lease',
    asset_amount: 130000,
    updated_date: '02-02-2023',
    payment_method: 'ACH',
    documents: {}
  },
  {
    id: 2,
    contract_id: 'LT2938173',
    payment_interval: 'Monthly',
    recurring_payment: 1240,
    payoff_amount: 1400,
    payment_start_date: '02-04-2023',
    down_payment: 1450,
    acquisition_date: '09-10-2023',
    carrier_id: 3,
    number_of_payments: 60,
    vendor_id: 4,
    asset_type: 'Trailer',
    acquisition_type: 'Rent',
    asset_amount: 125000,
    updated_date: '02-02-2023',
    payment_method: 'Wire',
    documents: {}
  }
]

export default assetsDetails
