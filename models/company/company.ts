// import { Address } from '../common/address'
// import { ImageUrl } from '../common/ImageUrl'

export interface Company {
    id: number;
    companyId: number;
    clientId: number;
    status: number;
    timestamp: Date;
    companyType: string;
    companyName: string;
    companyShortName: string;
    email: string;
    phone: string;
    fax: string;
    // companyAddress: Address;
    amazonCarrierId: string;
    taxId: string;
    dotNumber: string;
    mcNumber: string;
    ein: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
    // logoURL: ImageUrl;
    telegramChatId: string;
    performanceCategory: string;
    performanceLevel: number;
}
