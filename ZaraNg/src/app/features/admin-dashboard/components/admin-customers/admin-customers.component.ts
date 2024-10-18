import { Component, OnInit, } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { UserDTO } from '../../viewmodels/userdata';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})
export class AdminCustomersComponent implements OnInit {
  userData?: UserDTO[];
showAddress: boolean[] = [];
showOrder: boolean[] = [];
  constructor(
  private router: Router,
   private authService: AuthService,
   private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.getCustomerData().subscribe(data => {
      this.userData = data;
      this.userData.forEach(() => {
        this.showAddress.push(false);
        this.showOrder.push(false);
      })
    })
  
     
    
  }
  toggleaddress(index: number) {
    this.showAddress[index] = !this.showAddress[index];
}

toggleorder(index: number) {
    this.showOrder[index] = !this.showOrder[index];
}
// notifyUser(index: number) {
//   const user:any = this.userData?[index];
  
//   this.notificationService.notifyUser(user.id, "Hello");
// }
}