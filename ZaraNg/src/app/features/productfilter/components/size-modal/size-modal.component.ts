import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productsearch } from '../../viewmodels/product-search';

@Component({
  selector: 'app-size-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './size-modal.component.html',
  styleUrls: ['./size-modal.component.css'], // تم تصحيح الاسم هنا
})
export class SizeModalComponent {
  products: Productsearch;

  sizes: string[] = ['Small', 'Medium', 'Large', 'ExtraLarge'];

  isOpen: boolean = false;
  selectedSizes: string[] = [];

  @Output() sizeSelected = new EventEmitter<Productsearch>();
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

  toggleSize(size: string): void {
    const index = this.selectedSizes.indexOf(size);
    if (index === -1) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes.splice(index, 1);
    }
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

  viewResults(): void {
    if (this.selectedSizes.length > 0) {
      const sizeParams = this.selectedSizes.map(size => `sizes=${size}`).join('&');
      const categoryId = this.productSelected.length > 0 ? this.productSelected[0].categoryId : null;

      if (categoryId !== null) {
        this.products = this.filter.clearProductvc();
        this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;

        console.log('Fetching URL:', this.filter.url);

        this.filter.getAll().subscribe({
          next: (data) => {
            this.products = data;
            this.sizeSelected.emit(this.products);
            console.log('Products with selected sizes', this.products);
          },
          error: (err) => {
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
}

