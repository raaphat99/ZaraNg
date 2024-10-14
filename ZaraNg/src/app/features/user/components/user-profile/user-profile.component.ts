import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
userName:string = 'AMIR SHERIF';
userEmail:string = 'm_sh8004@yahoo.com';
constructor(
  private authService: AuthService,
  private router: Router
){}

logout(){
  this.authService.logout();
this.router.navigate(['/home']);
}
}
