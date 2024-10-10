import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserMainComponent } from './components/user-main/user-main.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { PurchaseDetialsComponent } from './components/purchase-detials/purchase-detials.component';
import { ReturnsComponent } from './components/returns/returns.component';

const routes: Routes = [
  { path: '', component: UserMainComponent },
  { path: 'wallet', component: PaymentMethodComponent },   
  { path: 'purchases', component: PurchasesComponent },   
  { path: 'purchases/:id', component: PurchaseDetialsComponent },
  { path: 'Returns', component: ReturnsComponent }


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
