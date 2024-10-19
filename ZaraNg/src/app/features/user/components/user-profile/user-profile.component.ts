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
userName: string | null = null;
userEmail: string | null = null;
showModal: boolean = false;
constructor(
  private authService: AuthService,
  private router: Router
){}
ngOnInit() {
  this.checkLoginStatus();
}
checkLoginStatus(): void {
  this.userName = this.authService.getUserName();
  this.userEmail=this.authService.getEmailFromToken();
}
openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}
deleteAccount() {
  this.authService.deleteAccount().subscribe({
    next: (response) => {
      if (response.status === 200) {
        console.log('Account deleted successfully.');
        this.authService.logout();
        this.router.navigate(['/home']);
      }
    },
    error: (err) => {
      console.error('Error deleting account:', err);
    },
    complete: () => {
      this.closeModal();
    }
  });
}
logout(){
  this.authService.logout();
this.router.navigate(['/home']);
}
}
