import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  jwt: string = new SharedService().getToken()
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/login') || req.url.includes("Enquiry")) {
      return next.handle(req)
    }
    return next.handle(req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.jwt,
      },
    })).pipe();
  }
}
