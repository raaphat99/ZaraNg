import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SizeModalComponent } from './components/size-modal/size-modal.component';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    ProductFilterComponent,
    SizeModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    HeaderComponent,
    FooterComponent,
],
  providers: [
    ProductService, 
    provideHttpClient(),
  ]
})
export class ProductModule { }
