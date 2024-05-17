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
}

export class UpdateCourseResource{
    id?:string;
    name?:string;
    description?:string;
    type?:CourseResourceType;
    courseId?:string;
    file?:File;
}