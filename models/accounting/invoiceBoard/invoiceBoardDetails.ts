export interface InvoiceBoardDetails {
  id: number;
  load_complete_date: string;
  driver_id: number;
  load_id: number;
  broker_id: number;
  broker_name: string;
  payout: number;
  billing: string;
  carrier_id: number;
  driver_name: string;
  factoring_payment: string;
  invoice_id: number;
  updated_date: string;
  invoice_status: string;
}
