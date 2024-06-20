import { AttendenceStatus } from "../../Enums/AttendenceStatus";
import { BatchStatus } from "../../Enums/Batchstatus";

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
  batchStatus?:BatchStatus;
  batchName?:string;
  
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
  export class StudentScheduleResponseModel{
    id?:string ;
    date?:Date 
    durationInHours?:number
    batchName?: string;
    contentName?: string;
   
  }
  export class SaveAttendence{
    attendanceDate?:Date;
    attendenceStatus?:AttendenceStatus[];
    studentId?:string[];
    scheduleId?:string;
  }
  export class AttendanceResponseModel{
    
    date?:Date;
    attendenceStatus?:AttendenceStatus[];
    studentId?:string[];
    scheduleId?:string;
   
  }