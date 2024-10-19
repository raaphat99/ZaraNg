import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule, formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productsearch } from '../../viewmodels/product-search';

@Component({
  selector: 'app-shoesize-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shoesize-modal.component.html',
  styleUrl: './shoesize-modal.component.css'
})
export class ShoesizeModalComponent {
  products: Productsearch;
  sizes: string[] = ['36', '38', '40', '42'];

  isOpen: boolean = false;
  selectedSizes: string[] = [];

  @Output() shoeSizeSelected = new EventEmitter<Productsearch>(); // Improved naming
  @Input() productSelected: Productsearch[] = [];

  constructor(public filter: FilterService) {
    this.products = this.filter.clearProductvc();
  }

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    console.log('Modal closed');
    this.isOpen = false;
  }

  toggleSizeSelection(size: string) {
    const index = this.selectedSizes.indexOf(size);
    if (index === -1) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes.splice(index, 1);
    }
  }

  viewResults(): void {
    if (this.selectedSizes.length > 0) {
      const sizeParams = this.selectedSizes
        .map(size => `sizes=${size}`)
        .join('&');

      const categoryId = this.productSelected.length > 0 ? this.productSelected[0].categoryId : null;

      if (categoryId !== null) {
        this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;
        console.log('Fetching URL:', this.filter.url);

        this.filter.getAll().subscribe({
          next: data => {
            this.products = data;
            this.shoeSizeSelected.emit(this.products);
            console.log('Products with selected sizes:', this.products);
          },
          error: err => {
            console.log('Error fetching products for selected sizes:', err);
          }
        });
      } else {
        console.log('No categoryId found in productSelected');
      }
    } else {
      console.log('No sizes selected');
    }
    this.close();
  }

  clearSelection(): void {
    this.selectedSizes = [];
    console.log('Selection cleared');
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSizes.includes(size);
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth < 700 && this.isOpen) {
      this.close();
    }
  }
}


