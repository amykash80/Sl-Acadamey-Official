export class BatchScheduleRequestModel{
    date?:string;
    durationInHours?:number;
    batchId?:string=''
    courseContentId?:string=''
}

export class BatchScheduleResponseModel{
    id?:string;
    date?:string;
    durationInHours?:number;
    batchId?:string=''
    courseContentId?:string=''
    batchName?:string;
    contentName?:string;
    isActive?:boolean;
}
export class UpdateBatchScheduleModel{
    id?:string;
    date?:string;
    durationInHours?:number;
    batchId?:string=''
    courseContentId?:string=''
   
}