import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  focusedFields: { [key: string]: boolean } = {};

  onFocus(field: string) {
    this.focusedFields[field] = true;
    //this.getErrorMessage(field);
  }

  onBlur(field: string) {
    this.focusedFields[field] = false;
  }

  getErrorMessage(field: string): string {
    if (field === 'email' && this.email === '') {
      return 'Field is required';
    }
    else if (field === 'password' && this.password === '') {
      return 'Field is required';
    }else{
      return `Enter your ${field}`;

    }
  }

  onSubmit() {
    if (this.email && this.password) {
      console.log('Login form submitted', { email: this.email, password: this.password });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
