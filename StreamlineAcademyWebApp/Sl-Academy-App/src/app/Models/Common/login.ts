import { Userrole } from "../../Enums/userrole";

export class Login {
    email?:string;
    password?:string
}
export class LoginResponse{
    fullName?:string;
    userRole?:Userrole;
    token?:string
}