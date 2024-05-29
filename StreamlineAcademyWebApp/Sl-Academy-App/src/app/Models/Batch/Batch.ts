export class BatchRequestModel{
    batchName?:string;
    batchSize?:number;
    startDate?:Date;
    endDate?:Date;
    courseId?:string;
    instructorId?:string=''
    locationId?:string=''
}
export class BatchResponseModel{
    id?:string;
    batchName?:string;
    batchSize?:number;
    startDate?:string;
    endDate?:string;
    courseName?:string;
    instructorName?:string;
    locationName?:string;
    instructorId?:string='';
    locationId?:string='';
    isActive?:boolean;
    courseId?:string='';
}
export class UpdateBatchModel{
    id?:string;
    batchName?:string;
    batchSize?:number;
    startDate?:Date;
    endDate?:Date;
    courseId?:string;
    instructorId?:string=''
    locationId?:string=''
}
export class AssignStudent{
    studentId?:string;
    batchId?:string;
}
