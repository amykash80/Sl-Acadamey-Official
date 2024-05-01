import { HttpInterceptorFn } from '@angular/common/http';
import { SharedService } from './shared.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const token = new SharedService().getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });
  return next(authReq);
};
