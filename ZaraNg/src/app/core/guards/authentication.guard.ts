import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  const isLoggedIn = authService.isAuthenticated;

  if (isLoggedIn) {
    return true;
  } 
  else 
  {
    authService.redirectUrl = state.url;
    router.navigate(['/login']);
    return false;
  }
};
