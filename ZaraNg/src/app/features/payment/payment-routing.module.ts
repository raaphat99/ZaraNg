import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingMethodSelectionComponent } from './components/shipping-method-selection/shipping-method-selection.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { PaymentMethodComponent } from '../user/components/payment-method/payment-method.component';

const routes: Routes = [
  { path: '', component: ShippingMethodSelectionComponent },
  { path: 'options', component: PaymentOptionsComponent },
  { path: 'credit-card-details', component: PaymentMethodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
