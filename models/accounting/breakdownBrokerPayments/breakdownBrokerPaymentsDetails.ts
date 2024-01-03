export interface BreakdownBrokerPaymentsDetail {
  id?: number;
  carrier_id: number;
  carrier_non_aged: number;
  carrier_aged: number;
  factoring_non_aged: number;
  factoring_charge_back: number;
  updated_date: string;
  factoring_aged: number;
}
