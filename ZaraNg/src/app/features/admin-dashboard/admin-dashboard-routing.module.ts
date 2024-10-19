import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminCustomersComponent } from './components/admin-customers/admin-customers.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';

const routes: Routes = [
  { path: '', component: AdminMainComponent },
  { path: 'categories', component: AdminCategoryComponent },
  { path: 'orders', component: AdminOrderComponent },
  { path: 'customers', component: AdminCustomersComponent },
  { path: 'registerAdmin', component: AdminRegisterComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
