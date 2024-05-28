export class AddStudent {
  name?: string;
  address?: string;
  postalCode?: string;
  phoneNumber?: string;
  email?: string;
  emergencyContactNo?: string;
  password?: string;
  courseId?: string[] = [];
  dateOfBirth?: string;
  countryId?: string = '';
  stateId?: string = '';
  cityId?: string = '';
}
export class StudentResponseModel{
  id?:string;
  name?: string;
  address?: string;
  postalCode?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  countryId?: string = '';
  stateId?: string = '';
  cityId?: string = '';
  countryName?:string;
  emergencyContactNo?: string
  stateName?:string;
  cityName?:string;
  academyName?:string;
  isActive?: boolean;
  
}
export class UpdateStudentModel {
    id?: string;
    name?: string;
    address?: string;
    postalCode?: string;
    phoneNumber?: string;
    email?: string;
    emergencyContactNo?: string;
    password?: string;
    courseId?: string[] = [];
    dateOfBirth?: string;
    countryId?: string = '';
    stateId?: string = '';
    cityId?: string = '';
  }