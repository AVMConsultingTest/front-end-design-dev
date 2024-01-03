export interface DocumentsDetails {
    id: number;
    carrier_id: number;
    driver_id: number;
    document_upload_date: string;
    report_type: string;
    updated_date: Date|string;
    document_expire_date: string;
    document_url: string;
    document_type: string;
    document_name: string;
    document_size: string;
    uploader_name: string;
  }
