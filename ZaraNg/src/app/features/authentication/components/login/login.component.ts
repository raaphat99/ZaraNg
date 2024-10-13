import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: LoginForm = { email: '', password: '' };
 
  showPassword: boolean = false;
  focusedFields: { [key: string]: boolean } = {};

  
  touchedFields: { [key: string]: boolean } = {};


  onFocus(field: string) {
    this.focusedFields[field] = true;
    this.touchedFields[field] = true;
  }

  onBlur(field: string) {
    this.focusedFields[field] = false;
  }

  getErrorMessage(field: string): string {
    switch (field) {
      case 'email':
        return 'Field is required';
      case 'password':
        return 'field is required';
    
      default:
        return 'Please enter ' + field;
    }
  }

  getInstructionMessage(field: string): string {
    switch (field) {
      case 'email':
        return 'Enter your email address';
      case 'password':
        return 'Enter your password'; 
      default:
        return 'Enter ' + field;
    }
  }

  isFieldEmpty(field: string): boolean {
    return !this.user[field];
  }

  showErrorMessage(field: string): boolean {
    return this.touchedFields[field] && !this.focusedFields[field] && this.isFieldEmpty(field);
  }

  showInstructionMessage(field: string): boolean {
    return this.focusedFields[field] || (!this.isFieldEmpty(field) && this.touchedFields[field]);
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
    if (this.user.email && this.user.password) {
      console.log('Login form submitted', { email: this.user.email, password: this.user.password });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
interface LoginForm {
  email: string;
  password: string;
  [key: string]: string;

}
