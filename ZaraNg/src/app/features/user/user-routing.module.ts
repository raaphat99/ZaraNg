import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserMainComponent } from './components/user-main/user-main.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { PurchaseDetialsComponent } from './components/purchase-detials/purchase-detials.component';
import { ReturnsComponent } from './components/returns/returns.component';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddAddressComponent } from './components/add-address/add-address.component';

const routes: Routes = [
  { path: '', component: UserMainComponent },
  { path: 'wallet', component: PaymentMethodComponent },   
  { path: 'purchases', component: PurchasesComponent },   
  { path: 'purchases/:id', component: PurchaseDetialsComponent },
  { path: 'returns', component: ReturnsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profile/:id/addresses', component: UserAddressesComponent },
  { path: 'profile/:id/add-address', component: AddAddressComponent },
  { path: 'profile/:id/change-email', component: ChangeEmailComponent },
  { path: 'profile/:id/change-password', component: ChangePasswordComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  constructor(private router: Router) {
    console.log('Current routes:', this.router.config);
  }
 }
