export interface DocumentsDetails {
    id: number;
    carrier_id: number;
    driver_id: number;
    document_upload_date: Date|string;
    document_status: string;
    document_category: string;
    document_location: string;
    updated_date: Date|string;
    document_expire_date: Date|string;
    document_type: string;

    document_description?: string;
    [x: string]:any;
}
