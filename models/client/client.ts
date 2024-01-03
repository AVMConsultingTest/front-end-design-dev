// import { Address } from '../common/address'

export interface Client {
    clientId: number;
    id: number;
    clientName: string;
    email: string;
    clientType: string;
    status: number;
    timestamp: Date;
    contactFirstName?: string;
    contactLastName: string;
    contactName: string;
    contactPhone: string;
    contact_job_title: null;
    // contactAddress: Address;
    telegramId: string;
    carrierFleetSize?: string;
    agreeToTerms: boolean;
    agreeToPrivacyPolicy: boolean;
}
