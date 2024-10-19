import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl, ValidationErrors,ReactiveFormsModule} from '@angular/forms';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, HeaderComponent, FooterComponent],
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
  registerForm!: FormGroup;
  focusedFields: { [key: string]: boolean } = {};
  errorSummary: boolean = false;
  summary: string = 'fill all required fields';
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router : Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? null : { invalidEmail: true };
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
  }

  onBlur(field: string) {
    this.focusedFields[field] = false;
    const control = this.registerForm.get(field);
    if (control) {
      control.markAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) {
      return 'Field is required';
    }
    if (field === 'email' && (control?.hasError('email') || control?.hasError('invalidEmail'))) {
      return 'Please enter a valid email address';
    }
    if (field === 'password') {
      if (control?.hasError('minlength')) {
        return 'Password should be at least 8 characters long';
      }
      if (control?.hasError('weakPassword')) {
        return 'Password should contain at least one uppercase letter, one lowercase letter, and one special character';
      }
    }
    return 'Please enter ' + field;
  }

  getInstructionMessage(field: string): string {
    switch (field) {
      case 'email':
        return 'Enter your email address';
      case 'password':
        return 'Password should be at least 8 characters long with at least one uppercase letter, one lowercase letter and one special character';
      case 'name':
        return 'Enter your first name';
      case 'surname':
        return 'Enter your surnames as they appear in your identity';
      default:
        return 'Enter ' + field;
    }
  }

  showErrorMessage(field: string): boolean {
    const control = this.registerForm.get(field);
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }

  showInstructionMessage(field: string): boolean {
    const control = this.registerForm.get(field);
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

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, name, surname } = this.registerForm.value;
      this.authService.registerAdmin(email, password, name, surname).subscribe({
        next: (response) =>{
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed', error);
         console.log(email, password, name, surname);
          this.errorSummary = true;

          // Handle registration error (e.g., show error message to user)
        }
      });
    } else {
      this.errorSummary = true;
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
