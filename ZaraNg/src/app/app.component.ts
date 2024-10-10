import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from "./features/authentication/components/login/login.component";
import { RegisterComponent } from "./features/authentication/components/register/register.component";
import { UserProfileComponent } from "./features/user/components/user-profile/user-profile.component";
import { UserAddressesComponent } from './features/user/components/user-addresses/user-addresses.component';
import { AddAddressComponent } from './features/user/components/add-address/add-address.component';
import { ChangeEmailComponent } from "./features/user/components/change-email/change-email.component";
import { ChangePasswordComponent } from "./features/user/components/change-password/change-password.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginComponent, RegisterComponent, UserProfileComponent, UserAddressesComponent, AddAddressComponent, ChangeEmailComponent, ChangePasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZaraNg';
}
