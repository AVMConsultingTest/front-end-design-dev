export interface DocumentsDetails {
    id: number;
    carrier_id: number;
    driver_id: number;
    document_upload_date: Date;
    document_status: string;
    document_category: string;
    document_location: string;
    updated_date: Date;
    document_expire_date: Date;
    document_type: string;
}
