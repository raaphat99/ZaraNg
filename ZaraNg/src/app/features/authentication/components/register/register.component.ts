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
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
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
    } else if (field === 'name' && this.name === '') {
      return 'Field is required';
    } else if (field === 'surname' && this.surname === '') {
      return 'Field is required';
    }
    else{
      return `Enter your ${field}`;

    }
  }

  onSubmit() {
    if (this.email && this.password) {
      console.log('Login form submitted', { email: this.email, password: this.password });
    }
  }
}
