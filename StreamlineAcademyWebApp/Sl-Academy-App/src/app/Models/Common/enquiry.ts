import { EnquireAs } from "../../Enums/EnquireAs";
import { RegistrationStatus } from "../../Enums/RegistrationStatus";
import { UserRole } from "../../Enums/userrole";

export class Enquiry {
    name?: string;
    email?: string;
    phoneNumber?: string;
    enquireAs:number=0
}
export class EnquiryResponse {
    id?: string;
    registrationStatus?: RegistrationStatus;
    isActive?: boolean;
    name?: string;
    email?: string;
    phoneNumber?: string;
    enquireAs?:EnquireAs
}
export class EnquiryUpdate {
    id?:string;
    name?: string;
    email?: string;
    phoneNumber?: string;
}