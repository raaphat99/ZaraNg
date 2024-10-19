import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink,CommonModule],
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
showModal: boolean = false;
openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

deleteAccount() {
   this.authService.deleteAccount().subscribe((response) => {
     if (response.status === 200) {
      console.log('Account deleted successfully.');
       this.authService.logout();
       this.router.navigate(['/home']);
     }
     
   });
  this.closeModal();
}
logout(){
  this.authService.logout();
this.router.navigate(['/home']);
}
}
