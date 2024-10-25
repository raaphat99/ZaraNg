import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { WishlistService , WishListItemDTO } from './services/wishlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CartItemDTO, CartService } from '../cart/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  isWishlistActive: boolean = true;
  wishlistItems: WishListItemDTO[] = [];
  addedToCart: WishListItemDTO | null = null;
  deletedProduct: WishListItemDTO | null = null;
  currencyCode: string = 'EGP';
  userName: string | null = null;
  cartItems: CartItemDTO[] = [];


  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.loadWishlistItems();
    this.loadCartItems();
    this.checkLoginStatus();
    // this.userName = this.authService.getUserName();
  }

  checkLoginStatus(): void {
    this.userName = this.authService.getUserName();
  }

  navigateToProductDetails(id: number) {
    this.router.navigate([`products/${id}`]);
  }

  //load cart items
  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      }
    });
  }

  //cart count
  get cartItemsCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  // Load wishlist items
  loadWishlistItems() {
    const userId = '02e8635d-3a28-49ca-a084-180c12e3b7c3'; // Consider getting this from AuthService
    this.wishlistService.getAllItems().subscribe({
      next: (data) => {
        this.wishlistItems = data;
        console.log(this.wishlistItems[0]);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading wishlist items:', error);
      }
    });
  }

  // Add item to cart from wishlist
  addToCart(wishlistItemId: number) {
    const userId = '02e8635d-3a28-49ca-a084-180c12e3b7c3'; // Use AuthService to fetch userId
    this.wishlistService.moveToCart(wishlistItemId).subscribe({
      next: (response) => {
        console.log(response);
        const index = this.wishlistItems.findIndex(item => item.id === wishlistItemId);
        if (index > -1) {
          this.wishlistItems.splice(index, 1);
          this.addedToCart = { ...this.wishlistItems[index]};
          setTimeout(() => {
            this.addedToCart = null;
          }, 5500);
        }
      },
      error: (error : HttpErrorResponse) => {
        console.error('Error moving item to cart:', error);
      }
    });
  }

  // Remove item from wishlist
  removeFromWishlist(item: WishListItemDTO) {
    const index = this.wishlistItems.indexOf(item);
    if (index > -1) {
      this.wishlistItems.splice(index, 1);
      this.deletedProduct = {...item};
      setTimeout(() => {
        this.deletedProduct = null;
      }, 5500);
    }  
      // const userId = '02e8635d-3a28-49ca-a084-180c12e3b7c3';
      this.wishlistService.addToWishlist(item.id).subscribe({
        next: (response) => {
          console.log(response);
          this.loadWishlistItems();
      },
        error: (error) => {
          console.error('Error adding item to wishlist:', error);
          this.loadWishlistItems();
        }
      });
    

    }

  // Check if wishlist is empty
  isWishlistEmpty(): boolean {
    return this.wishlistItems.length === 0;
  }

  // Undo delete action
  undoDelete() {
    if (this.deletedProduct) {
      this.removeFromWishlist(this.deletedProduct);
      this.loadWishlistItems();
      this.deletedProduct = null;
    }
  }

  isFavoriteActive: boolean = true;

toggleFavorite() {
  this.isFavoriteActive = !this.isFavoriteActive;
}

}