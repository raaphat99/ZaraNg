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
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddressesService , UserAddressDTO } from '../../services/user-addresses.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-address',
  standalone: true,
  imports: [ CommonModule, ButtonComponent, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.css'
})
export class UpdateAddressComponent {
  jwtHelper = new JwtHelperService();
  addAddressform!: FormGroup;
  governorates: Governorate[] = egyptGovernoratesList;
  cities: City[] = egyptCities;
  userName: string | null = null;
  userSurname: string | null = null;

  adressParam :UserAddressDTO= {
    name: '',
    phoneNumber: '',
    country: 'Egypt',
    state: '',
    area: '',
    city: '',
    street: '',
  };
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
    private router : Router,
    private route: ActivatedRoute,
    private userAddressesService:UserAddressesService
){  
}
isEditing = false;
currentAddressId: number | null = null;
addressId: number | undefined;
userAddressId!: number;  // Using definite assignment assertion
addressData: any;

  ngOnInit() {
    this.extractUserInfo();
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

      this.userAddressId = Number(this.route.snapshot.paramMap.get('id'));

      // Check if an address ID exists to determine if editing mode is on
      if (this.userAddressId) {
        this.isEditing = true;
    
        // Fetch the specific address data by ID
        this.userAddressesService.GetUserAddresses().subscribe((addresses) => {
          if (addresses && addresses.length > 0) {
            const data = addresses.find(address => address.id === this.userAddressId);
            if (data) {
              this.currentAddressId = data.id ?? null;
              this.addAddressform.patchValue({
                name: this.userName,
                surname: this.userSurname,
                street: data.street,
                moreInfo: data.area,
                governorate: data.state,
                city: data.city,
                phonePrefix: data.phoneNumber.slice(0, 3), // Assuming phone prefix is first 3 digits
                phoneNumber: data.phoneNumber.slice(3), // Remaining part of the phone number
              });
              // Populate filteredCities based on the selected governorate
              this.filteredCities = this.cities.filter(
                (city) => city.governorate_id === this.getGovernorateId(data.state)
              );
              this.addAddressform.get('city')?.enable(); // Enable the city field if governorate exists
            }
          }
        });      }
      
  
      
    }

    extractUserInfo(): void {
      const token = localStorage.getItem('token'); // or however you retrieve your token
      if (token) {
        const decoded: any = jwtDecode(token);
        const fullName = decoded.name;
        const [firstName, ...lastNameParts] = fullName.split(' ');
        this.userName = firstName;
        this.userSurname = lastNameParts.join(' '); // Join back if there are multiple last name parts
      }
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


  onSubmit() {
    if (this.addAddressform.valid) {
      const { name, surname, street, moreInfo, governorate, city, phonePrefix, phoneNumber } = this.addAddressform.value;
      
      this.adressParam = {
        phoneNumber: phonePrefix + phoneNumber,
        name: this.authService.getUserName()?? '',
        country: 'Egypt',
        state: governorate,
        city: city,
        area: moreInfo,
        street: street
      };
  
      if (this.isEditing && this.currentAddressId) {
        // If editing, include the ID and call update service
        this.adressParam.id = this.currentAddressId;
        this.userAddressesService.UpdateUserAddress(this.adressParam).subscribe({
          next: (response) => {
            console.log('Address updated successfully');
            this.router.navigate(['user/profile/:id/addresses']);
          },
          error: (error) => {
            console.error('Error updating address:', error);
            // Handle error appropriately
          }
        });
      } else {
        // If adding new address, call create service
        this.userAddressesService.CreateUserAddress(this.adressParam).subscribe({
          next: (response) => {
            console.log('Address created successfully');
            this.router.navigate(['user/profile/:id/addresses']);
          },
          error: (error) => {
            console.error('Error creating address:', error);
            // Handle error appropriately
          }
        });
      }
    }
  }
}
interface CustomJwtPayload extends JwtPayload {
  name: string; // Add any other custom claims if needed
}

