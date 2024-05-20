import { CourseResourceType } from "../../Enums/courseresourcetype";

export class CourseResource{
    Name?:string;
    Description?:string;
    Type?:CourseResourceType
    CourseId?:string=''
    File?:File;
}

export class CourseResourceResponse{
    id?:string;
    name?:string;
    description?:string;
    filePath?:string;
    type?:CourseResourceType;
    courseId?:string=''
    courseName?:string;
    isActive?:boolean;
    File?:File
}

export class UpdateCourseResource{
    Id?:string;
    Name?:string;
    Description?:string;
    Type?:CourseResourceType;
    CourseId?:string;
    File?:File;
}