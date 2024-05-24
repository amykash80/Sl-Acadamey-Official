import { RegistrationStatus } from "../../Enums/RegistrationStatus";

export class Enquiry {
    name?: string;
    email?: string;
    phoneNumber?: string;
}
export class EnquiryResponse {
    id?: string;
    registrationStatus?: RegistrationStatus;
    isActive?: boolean;
    name?: string;
    email?: string;
    phoneNumber?: string;
}
export class EnquiryUpdate {
    id?:string;
    name?: string;
    email?: string;
    phoneNumber?: string;
}