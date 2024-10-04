import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  const isLoggedIn = authService.isAuthenticated;
  
  if(isLoggedIn) 
  {
    if(authService?.currentUser?.admin)
      return true;
    else {
      router.navigate(["/no-access"]);
      return false
    }
  }
  else 
  {
    authService.redirectUrl = state.url
    router.navigate(["/login"]);
    return false;
  }
};
