import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private sharedService: SharedService,private router:Router) { }

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
        if (error.status === 401) {
          this.sharedService.showErrorToast('Token expired');
          localStorage.clear();
          this.router.navigate(['login']);
          this.router.navigate(['/login']); 
        }
        return throwError(error);
      })
    );
  }
}
