import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { Address } from '../../viewmodels/address';
import { City } from '../../viewmodels/city';
import { Governorate } from '../../viewmodels/governorate';
import { egyptGovernoratesList } from '../../static-data/egypt-governorates';
import { egyptCities } from '../../static-data/egypt-cities';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css',
})
export class AddAddressComponent implements OnInit {
  addAddressform!: FormGroup;
  governorates: Governorate[] = egyptGovernoratesList;
  cities: City[] = egyptCities;

  filteredCities: City[] = [];
  address: Address = {
    name: '',
    surname: '',
    street: '',
    moreInfo: '',
    city: '',
    phonePrefix: '',
    phoneNumber: '',
    governorate: '',
    region: 'Egypt',
  };
constructor(
  private authService: AuthService,
    private fb: FormBuilder,
    private router : Router
){}
  ngOnInit() {
    this.addAddressform = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      street: ['', Validators.required],
      moreInfo: [''],
      governorate: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      phonePrefix: ['', Validators.required],
      phoneNumber: ['', Validators.required],});
      this.addAddressform.get('governorate')?.valueChanges.subscribe(() => {
        this.onGovernorateChange();
      });
    }
  

  onGovernorateChange() {
    const governorateControl = this.addAddressform.get('governorate');
    const cityControl = this.addAddressform.get('city');

    if (governorateControl && cityControl) {
      const selectedGovernorate = governorateControl.value;
      cityControl.setValue('');

      if (selectedGovernorate) {
        this.filteredCities = this.cities.filter(
          (city) => city.governorate_id === this.getGovernorateId(selectedGovernorate)
        );
        cityControl.enable();
      } else {
        this.filteredCities = [];
        cityControl.disable();
      }
    }
  }
  getGovernorateId(governorateName: string): string {
    const governorate = this.governorates.find(
      (g) => g.governorate_name_en === governorateName
    );
    return governorate ? governorate.id : '';
  }

  focusedFields: { [key: string]: boolean } = {};
  touchedFields: { [key: string]: boolean } = {};

  onFocus(field: string) {
    this.focusedFields[field] = true;
    this.touchedFields[field] = true;
  }

  onBlur(field: string) {
    this.focusedFields[field] = false;
    const control = this.addAddressform.get(field);
    if (control) {
      control.markAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.addAddressform.get(field);
    if (control?.hasError('required')) {
      return 'Field is required';
    }
    if (field === 'city' ) {
      return 'Please select a governorate first';
    }
  
    return 'Please enter ' + field;
  }

  getInstructionMessage(field: string): string {
    switch (field) {
      case 'governorate':
        return 'Select your governorate from the list';
      case 'city':
        return 'Choose your city';
      case 'name':
        return 'Enter your first name';
      case 'surname':
        return 'Enter your surnames as they appear on your ID';
      case 'street':
        return 'Include thoroughfare number, type, and name';
      case 'phonePrefix':
        return 'Enter your country code (e.g., +20 for EG)';
      case 'phoneNumber':
        return 'Enter your phone number without spaces';
      case 'moreInfo':
        return 'Enter any additional information you want to add';
      default:
        return 'Enter ' + field;
    }
  }

  isFieldEmpty(field: string): boolean {
    return !this.address[field];
  }

  showErrorMessage(field: string): boolean {
    const control = this.addAddressform.get(field);
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }

  showInstructionMessage(field: string): boolean {
    const control = this.addAddressform.get(field);
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
  onSubmit() {}
}
