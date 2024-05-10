import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http:HttpClient) { }

  getCountries():Observable<any>{
    return this.http.get<any>(environment.apiUrl+"Profile/countries");
  }
  getStates():Observable<any>{
    return this.http.get<any>(environment.apiUrl+"Profile/states");
  }
  getCities():Observable<any>{
    return this.http.get<any>(environment.apiUrl+"Profile/cities");
  }
}

