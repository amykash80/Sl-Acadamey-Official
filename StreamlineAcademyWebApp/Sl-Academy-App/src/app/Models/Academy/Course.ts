export class CreateCourse{
    name?:string;
    description?:string;
    durationInWeeks?:number;
    fee?:number;
    categoryId?:string;
    academyId?:string;
}

export class CourseResponse{
    id?:string;
    name?:string=""
    description?:string;
    durationInWeeks?:number;
    categoryName?:string;
    academyName?:string;
    fee?:number;
    isActive?:boolean;
}
export class UpdateCourse{
    id?:string;
    name?:string;
    description?:string;
    durationInWeeks?:number;
    fee?:number;
    categoryId?:string;
    academyId?:string;
}
export class CourseContent{
    taskName?:string;
    description?:string;
    duration?:number;
    courseId?:string=''
}
export class CourseContentResponse{
    id?:string;
    taskName?:string;
    description?:string;
    duration?:number;
    courseName?:string;
}