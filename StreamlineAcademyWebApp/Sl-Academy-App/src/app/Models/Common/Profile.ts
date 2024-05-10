export class ContactResponse {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
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
}
export class UpdateAddress {
    address?: string;
    postalCode?: string;
    countryName?: string;
    stateName?: string;
    cityName?: string;
}
export class GetAddress {
    address?: string;
    postalCode?: string;
    countryName?: string;
    stateName?: string;
    cityName?: string;
}