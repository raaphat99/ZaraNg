import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModule } from './features/product/product.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { CartComponent } from './features/shopping/cart/cart.component';
import { WishlistComponent } from './features/shopping/wishlist/wishlist.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { LoginComponent } from "./features/authentication/components/login/login.component";
import { RegisterComponent } from "./features/authentication/components/register/register.component";
import { ProductfilterComponent } from "./features/productfilter/components/productfilter/productfilter.component";
import { AdminMainComponent } from "./features/admin-dashboard/components/admin-main/admin-main.component";
import { AdminCustomersComponent } from "./features/admin-dashboard/components/admin-customers/admin-customers.component";
import { UpdateAddressComponent } from "./features/user/components/update-address/update-address.component";
import { AdminCategoryComponent } from "./features/admin-dashboard/components/admin-category/admin-category.component";
import { AdminRegisterComponent } from "./features/admin-dashboard/components/admin-register/admin-register.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductModule,
    SharedModule,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    WishlistComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminMainComponent,
    AdminCustomersComponent,
    UpdateAddressComponent,
    AdminMainComponent,
    AdminCategoryComponent,
    AdminRegisterComponent
   
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ZaraNg';
}
