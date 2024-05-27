export class CourseCategoryRequestModel{
    categoryName?:string;
}
export class CourseCategoryResponse{
    id?:string;
    categoryName?:string;
    isActive?:boolean
}
export class CourseCategoryUpdateModel{
    id?:string;
    categoryName?:string;
}