export interface PersonalAddressInfoModel {
    id: number;
    address1:string,
    address2:string,
    city:string,
    state:string,
    zipCode:string,
    country:string,
}

export interface PersonalInfoModel {
    id: number;
    firstName:string,
    lastName:string,
    userName:string,
    jobTitle:string,
    phoneNumber:string,
    address: PersonalAddressInfoModel
}
