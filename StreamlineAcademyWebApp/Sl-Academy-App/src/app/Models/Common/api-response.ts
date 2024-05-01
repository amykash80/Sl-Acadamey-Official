export class ApiResponse<T> {
    isSuccess!: boolean;
    message!: string;
    warning!:string;
    statusCode!:number;
    result!: T;
}
