import { Skill } from "../../Enums/skill";
import { UserRole } from "../../Enums/userrole";

export class InstructorRequestModel{
    name?:string;
    address?:string;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    password?:string;
    skill?:Skill;
    workExperiance?:number;
    dateOfBirth?:string;
    countryId?:string=''
    stateId?:string=''
    cityId?:string=''
}

export class InstructorResponseModel{
    id?:string;
    name?:string;
    address?:string;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    skill?:Skill;
    workExperiance?:number;
    dateOfBirth?:string;
    countryId?:string=''
    stateId?:string=''
    cityId?:string=''
    userRole?:UserRole;
    countryName?:string=''
    stateName?:string; 
    cityName?:string;
    isActive?: boolean;
}

export class InstructorUpdateModel{
    id?:string;
    name?:string;
    address?:string;
    postalCode?:string;
    phoneNumber?:string;
    email?:string;
    skill?:Skill;
    WorkExperiance?:number;
    dateOfBirth?:string;
    countryId?:string;
    stateId?:string;
    cityId?:string;
    isActive?: boolean;
}
