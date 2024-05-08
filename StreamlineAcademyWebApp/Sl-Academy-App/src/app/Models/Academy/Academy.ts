import { UserRole } from "../../Enums/userrole";

export class RegisterAcademy{
    name?:string;
    academyName?:string;
    address?:string;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    password?:string;
    academyTypeId?:string;
    countryId?:string;
    stateId?:string;
    cityId?:string; 
}

export class AcademyResponse{
    id?:string;
    academyAdmin?:string;
    academyName?:string;
    address?:string;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    academyType?:string;
    countryName?:string;
    stateName?:string; 
    cityName?:string; 
    isActive?: boolean;
    userRole?:UserRole;  
} 
export class UpdateAcademy{
    id?:string;
    name?:string;
    academyName?:string;
    address?:string;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    academyTypeId?:string;
    countryId?:string;
    stateId?:string; 
    cityId?:string; 
    isActive?: boolean; 
} 