export interface InvoicingDetails {
  id: number
  carrier_id: number
  broker_id: number
  driver_id: number
  load_id: number
  invoice_id: number
  invoice_date: string
  trip_id: number
  documents: string
  broker_name: string
  driver_name: string
  load_complete_date: string
  gross_pay: number
  notes: string
  delivery_status: string
  invoice_start_date: string
  invoice_end_date: string
  invoice_start_time: string
  invoice_end_time: string
  invoice_origin: string
  invoice_destination: string
  miles: number
  contract_id: null
  updated_date: string
  }
