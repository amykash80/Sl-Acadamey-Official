import { UserRole } from "../../Enums/userrole";

export class Login {
    email?:string;
    password?:string
}
export class LoginResponse{
    fullName?:string;
    userRole?:UserRole;
    userId?:string;
    token?:string

}