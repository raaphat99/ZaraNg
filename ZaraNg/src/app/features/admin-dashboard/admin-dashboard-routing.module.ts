import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminProductCreateComponent } from './components/admin-product-create/admin-product-create.component';
import { AdminProductUpdateComponent } from './components/admin-product-update/admin-product-update.component';
import { AdminProductVariantComponent } from './components/admin-product-variant/admin-product-variant.component';

const routes: Routes = [
  { path: '', component: AdminMainComponent },
  { path: 'products', component: AdminProductComponent }, 
  { path: 'products/create', component: AdminProductCreateComponent }, 
  { path: 'products/update/:id', component: AdminProductUpdateComponent },
  { path: 'products/productvariant/:id', component: AdminProductVariantComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes),AdminProductComponent],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
