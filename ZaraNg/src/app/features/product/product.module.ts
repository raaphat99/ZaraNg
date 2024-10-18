import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SizeModalComponent } from './components/size-modal/size-modal.component';
import { ToastrService } from 'ngx-toastr';
import { WishlistComponent } from '../shopping/wishlist/wishlist.component';
import { WishlistNotificationComponent } from "../../shared/components/wishlist-notification/wishlist-notification.component";
import { CustomModalComponent } from '../../shared/components/custom-modal/custom-modal.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    SizeModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    HeaderComponent,
    FooterComponent,
    WishlistComponent,
    WishlistNotificationComponent,
    CustomModalComponent
],
  providers: [
    ProductService, 
    provideHttpClient(),
  ]
})
export class ProductModule { }
