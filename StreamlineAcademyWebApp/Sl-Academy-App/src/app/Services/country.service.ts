import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
private countriesUrl='https://restcountries.com/v3.1/all';
// private statesUrl = 'https://example.com/api/states';
  constructor(private http:HttpClient) { }

  getCountries():Observable<any[]>{
    return this.http.get<any[]>(this.countriesUrl);
  }
  // getStates(): Observable<any[]> {
  //   return this.http.get<any[]>(this.statesUrl);
  // }

  // getStatesByCountry(countryId: string): Observable<any[]> {
  //   // Construct the URL with the country ID
  //   return this.http.get<any[]>(`${this.statesUrl}?countryId=${countryId}`);
  // }
}

