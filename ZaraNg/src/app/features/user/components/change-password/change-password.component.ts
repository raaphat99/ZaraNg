import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  user: changePasswordForm = { currentPassword: '', newPassword: '' };
  changPasswordForm!: FormGroup
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  focusedFields: { [key: string]: boolean } = {};

  modalMessage: string = 'Loading...';
  touchedFields: { [key: string]: boolean } = {};
  showSummary:boolean=false;
  summary:string="Please fill all require fields";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.changPasswordForm = this.fb.group({
      currentpassword: ['', [Validators.required,]],
      newpassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
    });
  }
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (hasUpperCase && hasLowerCase && hasSpecialChar) {
      return null;
    }

    return { weakPassword: true };
  }

  onFocus(field: string) {
    this.focusedFields[field] = true;
    this.touchedFields[field] = true;
  }

  onBlur(field: string) {
    this.focusedFields[field] = false;
    const control = this.changPasswordForm.get(field);
    if (control) {
      control.markAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.changPasswordForm.get(field);
    if (control?.hasError('required')) {
      return 'Field is required';
    }

    if (field === 'newpassword') {
      if (control?.hasError('minlength')) {
        return 'Password should be at least 8 characters long';
      }
      if (control?.hasError('weakPassword')) {
        return 'Password should contain at least one uppercase letter, one lowercase letter, and one special character';
      }
    }
    return 'Please enter your' + field;
  }


  getInstructionMessage(field: string): string {
    switch (field) {
      case 'currentpassword':
        return 'Enter your current password';
      case 'nwepassword':
        return 'Password should be at least 8 characters long with at least one uppercase letter, one lowercase letter and one special character';
      default:
        return 'Enter ' + field;
    }
  }

  isFieldEmpty(field: string): boolean {
    return !this.user[field];
  }

  showErrorMessage(field: string): boolean {
    const control = this.changPasswordForm.get(field);
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }

  showInstructionMessage(field: string): boolean {
    const control = this.changPasswordForm.get(field);
    return this.focusedFields[field] || (control ? (!control.value && control.touched) : false);
  }
  getMessageType(field: string): 'instruction' | 'warning' | null {
    if (this.showErrorMessage(field)) {
      return 'warning';
    } else if (this.showInstructionMessage(field)) {
      return 'instruction';
    }
    return null;
  }
  getMessage(field: string): string {
    const messageType = this.getMessageType(field);
    if (messageType === 'warning') {
      return this.getErrorMessage(field);
    } else if (messageType === 'instruction') {
      return this.getInstructionMessage(field);
    }
    return '';
  }


  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  onSubmit() {
    if(!this.changPasswordForm.valid){
      this.showSummary=true;
    }
    if (this.changPasswordForm.valid) {
      const { currentpassword, newpassword } = this.changPasswordForm.value;
      const dialogRef = this.dialog.open(this.modalTemplate, {
        disableClose: true,
      });
      console.log(currentpassword, newpassword);
     
      this.authService.changePassword(currentpassword, newpassword).subscribe({
        next: (response) => {
          // Close the modal after 2 seconds for a valid response
          console.log(response);
          if (response.status === 200) {
            this.modalMessage = 'Password changed successfully';
            console.log('success');
            setTimeout(() => {
              dialogRef.close(); // Close modal on success
              this.authService.logout();
              this.router.navigate(['/login']);
            }, 4000);
            this.modalMessage = 'Loading...';
          }
        },
        error: (error) => {
          console.log(error);
          // Handle API errors (e.g., 401 Unauthorized, 500 Server Error)
          setTimeout(() => {
            this.modalMessage = 'Password incorrect';
          }, 500);

          setTimeout(() => dialogRef.close(), 3000); // Close modal after 3s on error
          this.modalMessage = 'Loading...';
        },
      });
    }
  }
}
interface changePasswordForm {
  currentPassword: string;
  newPassword: string;
  [key: string]: string;
}


