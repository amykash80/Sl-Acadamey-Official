import { CanActivateFn, Router } from '@angular/router';
import { Inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router= Inject(Router);
  const authService=Inject(AuthService);
  if (authService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']); 
    return false;
  }
};
