import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddStudent } from '../Models/student/students';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  saveStudent(studentModel:AddStudent):Observable<any>{
    return this.http.post<any>(environment.apiUrl+"Student/register-student",studentModel)
  }
}
