import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../viewmodels/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }


  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
    if (this.isBookmarked) {
      this.showToast("Saved");
    }
    else {
      this.showToast("The item has been removed from favourites.")
    }
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  showToast(message: string) {
    this.toastr.success(message);
  }
}
