import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../viewmodels/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WishlistService } from '../../../shopping/wishlist/services/wishlist.service';
import { WishlistNotificationComponent } from '../../../../shared/components/wishlist-notification/wishlist-notification.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  @Input() product!: Product;
  isBookmarked: boolean = false;
  isPopupVisible = false;
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  @ViewChild(WishlistNotificationComponent)
  notificationComponent!: WishlistNotificationComponent;

  constructor(private toastr: ToastrService, private router: Router, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }


  toggleBookmark(): void {
    let productId = this.product!.id;

    if (this.isBookmarked) {
      this.wishlistService.removeFromWishlist(productId).subscribe({
        next: () => {
          this.isBookmarked = false;
          this.notificationComponent.showNotification(
            'The item has been removed from favourites.'
          );
          console.log("The item has been removed from favourites.");
        },
        error: (error) =>
          console.error('Error removing product from wishlist', error),
      });
    } else {
      this.wishlistService.addProductToWishlist(productId).subscribe({
        next: () => {
          this.isBookmarked = true;
          this.notificationComponent.showNotification('Saved.');
          console.log("Saved.");
        },
        error: (error) =>
          console.error('Error adding product to wishlist', error),
      });
    }
  }
  // toggleBookmark() {
  //   this.isBookmarked = !this.isBookmarked;
  //   if (this.isBookmarked) {
  //     this.showToast("Saved");
  //   }
  //   else {
  //     this.showToast("The item has been removed from favourites.")
  //   }
  // }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  showToast(message: string) {
    this.toastr.success(message);
  }
}
