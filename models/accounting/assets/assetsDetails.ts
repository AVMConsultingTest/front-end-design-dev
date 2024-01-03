export interface AssetsDetails {
  id: number;
  contract_id: string;
  payment_interval: string;
  recurring_payment: number;
  payoff_amount: number;
  payment_start_date: string;
  down_payment: number;
  acquisition_date: string;
  carrier_id: number;
  number_of_payments: number;
  vendor_id: number;
  asset_type: string;
  acquisition_type: string;
  asset_amount: number;
  updated_date: string;
  payment_method: string;
  documents: {}
}
