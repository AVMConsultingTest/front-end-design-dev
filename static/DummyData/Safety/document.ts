import { DocumentsDetails } from '~/models/documents/documentsDetails'

const document:Array<DocumentsDetails> = [
  {
    document_category: 'Document Files',
    document_type: 'Medical Card',
    document_status: 'Expired',
    document_upload_date: '08-10-2023'
  } as DocumentsDetails,
  {
    document_category: 'Financials',
    document_type: 'CDL',
    document_status: 'Valid',
    document_upload_date: '10-02-2023'
  } as DocumentsDetails
]

export default document
