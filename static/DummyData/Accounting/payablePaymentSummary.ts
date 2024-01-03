import { PayablePaymentSummary } from '~/models/accounting/payablePaymentSummary/payablePaymentSummary'

const payablePaymentSummary:Array<PayablePaymentSummary> = [
  {
    id: 1,
    carrier_id: 3,
    real_estate_payment: 10900,
    upcoming_operational_payment: 14005,
    upcoming_real_estate_payment: 7500,
    upcoming_fleet_payment: 6875,
    updated_date: '02-04-2023',
    fleet_payment: 4650,
    operational_payment: 4950
  }
]

export default payablePaymentSummary
