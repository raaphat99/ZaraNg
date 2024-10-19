import { Component, OnInit, } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { UserDTO } from '../../viewmodels/userdata';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl, ValidationErrors,ReactiveFormsModule} from '@angular/forms';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})
export class AdminCustomersComponent implements OnInit {
  notifyForm!: FormGroup;
  notifyAllForm!: FormGroup;

  userData?: UserDTO[];
showAddress: boolean[] = [];
showOrder: boolean[] = [];
showNotifyUser:boolean = false;
showNotifyAll:boolean = false;
selectedIndex:number=0;
  constructor(
  private router: Router,
   private authService: AuthService,
   private fb: FormBuilder,
   private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.getCustomerData().subscribe(data => {
      this.userData = data;
      this.userData.forEach(() => {
        this.showAddress.push(false);
        this.showOrder.push(false);
      })
      this.notifyForm = this.fb.group({
        message: ['', Validators.required]
      })
      this.notifyAllForm = this.fb.group({
        message: ['', Validators.required]
      })
    })
  }
  notifyAction(index: number) {
    this.showNotifyUser= true; this.selectedIndex = index;
  }
  notifyAllAction() {
    this.showNotifyAll= true;
  }
notifyUser() {
  const user: any = this.userData ? this.userData[this.selectedIndex] : null;
  if(this.notifyForm.valid) {
    const message:string= this.notifyForm.value.message;
    console.log(message);
    if (user) {
      this.notificationService.notifyUser(user.id, message).subscribe({
        next: () => {
          console.log('Notification sent successfully');
      this.showNotifyUser= false;

        },
        error: (error) => {
          console.error('Error sending notification', error);
        }
      });
    } 
  }
}
notifyAllUsers() {
  const message:string= this.notifyAllForm.value.message;
  console.log(message);
  this.notificationService.notifyAll(message).subscribe({
    next: () => {
      console.log('Notification sent successfully');
      this.showNotifyAll= false;
    },
    error: (error) => {
      console.error('Error sending notification', error);
    }
  });
  }
  toggleaddress(index: number) {
    this.showAddress[index] = !this.showAddress[index];
}

toggleorder(index: number) {
    this.showOrder[index] = !this.showOrder[index];
}

}