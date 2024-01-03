import { SelectOption } from '../../components/ts/interfaces'

export interface RequestFreeDemoModel {
    firstName: string,
    lastName: string,
    email: string,
    companyName: string,
    companyType:number|string,
    source: string,
    phoneNumber: string,

    companyTypeOptions: SelectOption[]
}
