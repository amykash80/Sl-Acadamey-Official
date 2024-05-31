import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private sharedService: SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/login') || req.url.includes("Enquiry")) {
      return next.handle(req);
    }

    return of(this.sharedService.getToken()).pipe(
      switchMap((jwt: string) => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + jwt
          }
        });
        return next.handle(authReq);
      }),
      catchError(error => {
     
        return throwError(error);
      })
    );
  }
}
