import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModule } from './features/product/product.module';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SharedModule } from './shared/shared.module';
import { CartComponent } from "./features/shopping/cart/cart.component";
import { WishlistComponent } from "./features/shopping/wishlist/wishlist.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductModule, SharedModule, HeaderComponent, CartComponent, WishlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZaraNg';
}
