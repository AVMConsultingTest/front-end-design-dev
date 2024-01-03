export interface AssetTransactionsDetail {
    id: number;
    carrier_id: number;
    transaction_id: string;
    transaction_date: string;
    notes: string;
    contract_id: string;
    vendor_id: number;
    payment_amount: number;
    asset_id: number;
    payment_category: string;
    updated_date: string;
    documents: {};
    payment_method: string;
}
