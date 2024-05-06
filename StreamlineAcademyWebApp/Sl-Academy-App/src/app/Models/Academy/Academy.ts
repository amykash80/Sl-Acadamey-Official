import { UserRole } from "../../Enums/userrole";

export class Academy{
    name?:string;
    academyName?:string;
    address?:string;
    postalCode?:number;
    phoneNumber?:string;
    email?:string;
    password?:string;
    academyTypeId?:string;
    countryId?:string;
    cityId?:string; 
}

export class AcademyResponse{
    id?:string;
    academyAdmin?:string;
    academyName?:string;
    address?:number;
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
export class AcademyUpdate{
    id?:string;
    name?:string;
    academyName?:string;
    address?:number;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    password?:string;
    academyTypeId?:string;
    countryId?:string;
    stateId?:string; 
    cityId?:string; 
    isActive?: boolean; 
} 