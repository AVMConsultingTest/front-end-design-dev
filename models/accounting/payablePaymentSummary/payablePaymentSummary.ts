export interface PayablePaymentSummary {
  id: number;
  carrier_id: number;
  real_estate_payment: number;
  upcoming_operational_payment: number;
  upcoming_real_estate_payment: number;
  upcoming_fleet_payment: number;
  updated_date: string;
  fleet_payment: number;
  operational_payment: number;
}
