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

  ngOnInit() {
    this.filteredCities = this.cities;
  }

  onGovernorateChange() {
    this.address.city = ''; // Reset city when governorate changes
    this.filteredCities = this.cities.filter(
      (city) =>
        city.governorate_id === this.getGovernorateId(this.address.governorate)
    );
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
  }

  getErrorMessage(field: string): string {
    switch (field) {
      case 'moreInfo':
        return 'optional';
      default:
        return 'Required field ';
    }
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
    return (
      this.touchedFields[field] &&
      !this.focusedFields[field] &&
      this.isFieldEmpty(field)
    );
  }

  showInstructionMessage(field: string): boolean {
    return (
      this.focusedFields[field] ||
      (!this.isFieldEmpty(field) && this.touchedFields[field])
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
  onSubmit() {}
}
