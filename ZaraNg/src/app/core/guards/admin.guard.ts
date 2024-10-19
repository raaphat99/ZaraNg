import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole === 'Admin') {
      return true; 
    } else if (userRole) {
      this.router.navigate(['/not-found']);
      return false;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
