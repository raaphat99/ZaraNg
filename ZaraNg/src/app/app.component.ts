import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModule } from './features/product/product.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { CartComponent } from './features/shopping/cart/cart.component';
import { WishlistComponent } from './features/shopping/wishlist/wishlist.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './features/home/components/home/home.component';
import { ProductfilterComponent } from "./features/productfilter/components/productfilter/productfilter.component";

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
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ZaraNg';
}
