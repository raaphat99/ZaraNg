import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  // { path: 'products', component: ProductListComponent },
  // { path: 'products/:id', component: ProductDetailComponent },

  // The ProductModule will only be loaded when a user navigates to a route that starts with /products
  { path: 'products', loadChildren: () => import('./product.module').then(m => m.ProductModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
