import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productsearch } from '../../viewmodels/product-search';

@Component({
  selector: 'app-price-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.css'] // تأكد من تصحيح الاسم هنا
})
export class PriceModalComponent {
  products: Productsearch;
  minPrice: number = 390;  // Minimum price
  maxPrice: number = 22990; // Maximum price
  startPrice: number = this.minPrice; // Starting price
  endPrice: number = this.maxPrice;   // Ending price

  isOpen: boolean = false; // Renamed for consistency
  selectedStyles: string[] = []; // Renamed for clarity
  
  initialStartPrice: number = this.minPrice; // Default value for starting price
  initialEndPrice: number = this.maxPrice;   // Default value for ending price

  @Output() priceSelected = new EventEmitter<Productsearch>(); 
  @Input() productSelected: Productsearch[] = []; // Renamed for consistency

  constructor(public filter: FilterService) {
    this.products = this.filter.clearProductvc();
  }

  open(): void {
    this.isOpen = true; // Consistent naming
  }

  close(): void {
    console.log('Modal closed'); 
    this.isOpen = false; // Consistent naming
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth < 700 && this.isOpen) {
      this.close();
    }
  }

  updatePrices(): void {
    // Ensure that startPrice does not exceed endPrice
    if (this.startPrice > this.endPrice) {
      this.startPrice = this.endPrice;
    }
  }

  viewResults(): void {
    const categoryId = this.productSelected.length > 0 ? this.productSelected[0].categoryId : null;

    if (categoryId !== null) {
      this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&priceFrom=${this.startPrice}&priceTo=${this.endPrice}`;
      console.log('Fetching URL:', this.filter.url);
      this.products = this.filter.clearProductvc();

      this.filter.getAll().subscribe({
        next: data => {
          this.products = data;
          this.priceSelected.emit(this.products);
          console.log("Products with selected prices:", this.products);
        },
        error: err => {
          console.error('Error fetching products for selected prices:', err);
        }
      });

    } else {
      console.error('No categoryId found in productSelected');
    }
    this.close();
  }

  clearSelection(): void {
    // Reset slider values to default
    this.startPrice = this.minPrice;
    this.endPrice = this.maxPrice;
    this.selectedStyles = []; // Consistent naming
    console.log('Selection cleared'); 
  }

  isStyleSelected(style: string): boolean {
    return this.selectedStyles.includes(style); // Consistent naming
  }

  isClearDisabled(): boolean {
    return (this.startPrice === this.minPrice && this.endPrice === this.maxPrice);
  }
}
