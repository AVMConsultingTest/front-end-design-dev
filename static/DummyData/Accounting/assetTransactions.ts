import { AssetTransactionsDetail } from '~/models/accounting/assetTransactions/assetTransactionsDetails'

const assetTransactions:Array<AssetTransactionsDetail> = [
  {
    id: 1,
    carrier_id: 3,
    transaction_id: 'AX1025',
    transaction_date: '02-04-2023',
    notes: 'Test',
    contract_id: 'MB451',
    vendor_id: 2,
    payment_amount: 1400,
    asset_id: 5,
    payment_category: 'Truck',
    updated_date: '02-07-2023',
    documents: {},
    payment_method: 'Wire'
  },
  {
    id: 2,
    carrier_id: 3,
    transaction_id: 'XB1150',
    transaction_date: '10-05-2023',
    notes: 'Test',
    contract_id: 'VX451',
    vendor_id: 2,
    payment_amount: 1250,
    asset_id: 6,
    payment_category: 'Office Building',
    updated_date: '02-07-2023',
    documents: {},
    payment_method: 'Wire'
  }
]

export default assetTransactions
