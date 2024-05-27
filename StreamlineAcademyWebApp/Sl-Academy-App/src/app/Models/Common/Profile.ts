import { UserRole } from "../../Enums/userrole";

export class ContactResponse {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    userRole?:UserRole
}
export class GetContact {
    name?: string;
    email?: string;
    phoneNumber?: string;
}
export class UpdateContact {
    name?: string;
    email?: string;
    phoneNumber?: string;
}
export class AddressResponse {
    id?: string;
    address?: string;
    postalCode?: string;
    countryName?: string;
    stateName?: string;
    cityName?: string;
    countryId?: string='';
    stateId?: string='';
    cityId?: string=''
}
export class UpdateAddress {
    address?: string;
    postalCode?: string;
    countryName?: string;
    stateName?: string;
    cityName?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
}
export class GetAddress {
    address?: string;
    postalCode?: string;
    countryId?: string;
    stateId?: string;
    cityId?: string;
    
}
