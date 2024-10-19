import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productsearch } from '../../viewmodels/product-search';

@Component({
  selector: 'app-style-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './style-modal.component.html',
  styleUrls: ['./style-modal.component.css'] // التصحيح هنا
})
export class StyleModalComponent {
  products: Productsearch;

  styles: string[] = ['DRESSES', 'TOPS', 'T-SHIRTS', 'BASIC']; // Updated variable name to lowercase for consistency
  isOpen: boolean = false;
  selectedStyles: string[] = [];

  @Output() styleSelected = new EventEmitter<Productsearch>();
  @Input() productSelected: Productsearch[] = [];

  private styleProductIdMap: { [key: string]: number } = {
    'DRESSES': 14,
    'TOPS': 15,
    'T-SHIRTS': 16,
    'BASIC': 33,
  };

  constructor(public filter: FilterService) {
    this.products = this.filter.clearProductvc();
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

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    console.log('Modal closed');
    this.isOpen = false;
  }

  toggleStyle(style: string): void {
    const index = this.selectedStyles.indexOf(style);
    if (index === -1) {
      this.selectedStyles.push(style);
    } else {
      this.selectedStyles.splice(index, 1);
    }
  }

  viewResults(): void {
    if (this.selectedStyles.length > 0) {
      const categoryId = this.productSelected.length > 0 ? this.productSelected[0].categoryId : null;

      if (categoryId !== null) {
        this.products = this.filter.clearProductvc();

        for (const style of this.selectedStyles) {
          const productId = this.styleProductIdMap[style];
          if (productId) {
            const url = `http://localhost:5250/api/Products/category/${productId}`;
            console.log('Fetching URL:', url);

            this.filter.url = url;

            this.filter.getAll().subscribe({
              next: (data) => {
                this.products = data;
                this.styleSelected.emit(this.products);
                console.log('Products with selected style', this.products);
              },
              error: (err) => {
                console.error('Error fetching products for selected style:', err);
              },
            });
          }
        }

      } else {
        console.error('No categoryId found in productSelected');
      }
    } else {
      console.log('No styles selected');
    }
    this.close();
  }

  clearSelection(): void {
    this.selectedStyles = [];
    console.log('Selection cleared');
  }

  isStyleSelected(style: string): boolean {
    return this.selectedStyles.includes(style);
  }
}
