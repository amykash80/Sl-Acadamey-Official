import { RegistrationStatus } from "../../Enums/RegistrationStatus";
import { UserRole } from "../../Enums/userrole";

export class Enquiry {
    name?: string;
    email?: string;
    phoneNumber?: string;
    enquireAs=''
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