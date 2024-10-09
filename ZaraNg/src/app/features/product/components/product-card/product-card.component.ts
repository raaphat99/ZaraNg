import { Component, Input } from '@angular/core';
import { Product } from '../../viewmodels/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  isBookmarked: boolean = false;
  isPopupVisible = false;
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
