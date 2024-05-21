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
    startDate?:Date;
    endDate?:Date;
    courseName?:string;
    instructorName?:string;
    locationName?:string;
    instructorId?:string='';
    locationId?:string='';
    isActive?:boolean;
}
