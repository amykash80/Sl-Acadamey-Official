export class ContactResponse {
    id?: string;
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
