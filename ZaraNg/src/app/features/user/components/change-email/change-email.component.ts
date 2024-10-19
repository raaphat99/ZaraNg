import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.css',
})
export class ChangeEmailComponent {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  changeEmailForm!: FormGroup;
  currentEmail: string | null = null;
  user: changeEmailForm = { email: '', password: '' };

  showPassword: boolean = false;
  focusedFields: { [key: string]: boolean } = {};
  modalMessage: string = 'Loading...';

  touchedFields: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.changeEmailForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: [
        '',
        [Validators.required, Validators.email, this.customEmailValidator],
      ],
    });
  }
  checkLoginStatus(): void {
    this.currentEmail=this.authService.getEmailFromToken();
  }
  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : { invalidEmail: true };
  }
  onFocus(field: string) {
    this.focusedFields[field] = true;
  }

  onBlur(field: string) {
    this.focusedFields[field] = false;
    const control = this.changeEmailForm.get(field);
    if (control) {
      control.markAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.changeEmailForm.get(field);
    if (control?.hasError('required')) {
      return 'Field is required';
    }
    if (
      field === 'email' &&
      (control?.hasError('email') || control?.hasError('invalidEmail'))
    ) {
      return 'Please enter a valid email address';
    }
    return 'Please enter ' + field;
  }

  getInstructionMessage(field: string): string {
    switch (field) {
      case 'email':
        return 'Enter your valid new email address';

      default:
        return 'Enter ' + field;
    }
  }

  isFieldEmpty(field: string): boolean {
    return !this.user[field];
  }

  showErrorMessage(field: string): boolean {
    const control = this.changeEmailForm.get(field);
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }

  showInstructionMessage(field: string): boolean {
    const control = this.changeEmailForm.get(field);
    return (
      this.focusedFields[field] ||
      (control ? !control.value && control.touched : false)
    );
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
  onSubmit() {
    if (this.changeEmailForm.valid) {
      const { password, email } = this.changeEmailForm.value;
      const dialogRef = this.dialog.open(this.modalTemplate, {
        disableClose: true,
      });
      
      this.authService.changeEmail(password, email).subscribe({
        next: (response) => {
          // Close the modal after 2 seconds for a valid response
          if (response.status === 200) {
            this.modalMessage = 'Email updated successfully';
            console.log('success');
            setTimeout(() => {
              dialogRef.close(); // Close modal on success
              this.router.navigate(['/login']);
            }, 4000);
            this.modalMessage = 'Loading...';
          }
        },
        error: (error) => {
          console.log(error);
          // Handle API errors (e.g., 401 Unauthorized, 500 Server Error)
          setTimeout(() => {
            this.modalMessage = 'Email already in use';
          }, 500);

          setTimeout(() => dialogRef.close(), 3000); // Close modal after 3s on error
          this.modalMessage = 'Loading...';
        },
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
interface changeEmailForm {
  email: string;
  password: string;
  [key: string]: string;
}
