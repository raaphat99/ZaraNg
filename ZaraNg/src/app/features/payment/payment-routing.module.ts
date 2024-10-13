import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingMethodSelectionComponent } from './components/shipping-method-selection/shipping-method-selection.component';

const routes: Routes = [
  { path: '', component: ShippingMethodSelectionComponent }, // Default route for product listing
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
