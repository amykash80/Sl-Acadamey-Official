import { registrationStatus } from "../../Enums/RegistrationStatus";

export class Enquiry {
    name?: string;
    email?: string;
    phoneNumber?: string;
}
export class EnquiryResponse {
    id?: string;
    registrationStatus?: registrationStatus;
    isActive?: boolean;
    name?: string;
    email?: string;
    phoneNumber?: string;
}