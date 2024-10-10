import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: RegisterForm = {
    email: '',
    password: '',
    name: '',
    surname: '',
  }

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
        return `Password should be at least 8 characters long with at least one uppercase letter, 
        one lowercase letter and one special character`; 
        case 'name':
        return 'Enter your first name';
        case 'surname':
        return 'Enter your surnames as they appear in your identity ';
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
    
  }
}
interface RegisterForm{
  email: string;
  password: string;
  name: string;
  surname: string;
  [key: string]: string;
}
