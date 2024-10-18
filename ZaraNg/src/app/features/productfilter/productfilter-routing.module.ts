import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductfilterComponent } from './components/productfilter/productfilter.component';

const routes: Routes = [
  { path: '', component: ProductfilterComponent } // استخدام المكون مباشرة
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductfilterRoutingModule {}
