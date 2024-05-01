import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getToken():string{
  return localStorage.getItem("streamlineToken")
  ? JSON.parse(localStorage['streamlineToken']).token
  : '';
  }

}
