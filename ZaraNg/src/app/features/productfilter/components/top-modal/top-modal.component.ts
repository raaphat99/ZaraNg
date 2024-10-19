import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productsearch } from '../../viewmodels/product-search';

@Component({
  selector: 'app-top-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './top-modal.component.html',
  styleUrls: ['./top-modal.component.css']
})
export class TopModalComponent {
  products: Productsearch;
  styles: string[] = [
    'BLAZERS',
    'TROUSERS',
    'JEANS',
    'SKIRTS',
    'OUTERWEAR',
    'CARDIGANS',
    'KNITWEAR',
    'SWEATSHIRTS',
    'SUITS',
  ]; // Renamed to lowercase "styles" for consistency

  isOpen: boolean = false; // Updated naming to camelCase for consistency
  selectedTop: string[] = [];

  @Output() topSelected = new EventEmitter<Productsearch>();
  @Input() productSelected: Productsearch[] = [];

  private styleProductIdMap: { [key: string]: number } = {
    'BLAZERS': 13,
    'TROUSERS': 18,
    'JEANS': 19,
    'SKIRTS': 20,
    'OUTERWEAR': 21,
    'CARDIGANS': 22,
    'KNITWEAR': 23,
    'SWEATSHIRTS': 24,
    'SUITS': 30,
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
    const index = this.selectedTop.indexOf(style);
    if (index === -1) {
      this.selectedTop.push(style);
    } else {
      this.selectedTop.splice(index, 1);
    }
  }

  viewResults(): void {
    if (this.selectedTop.length > 0) {
      const categoryId = this.productSelected.length > 0 ? this.productSelected[0].categoryId : null;

      if (categoryId !== null) {
        this.products = this.filter.clearProductvc();

        for (const style of this.selectedTop) {
          const productId = this.styleProductIdMap[style]; // Get product ID based on the selected style

          if (productId) {
            const url = `http://localhost:5250/api/Products/category/${productId}`;
            console.log('Fetching URL:', url);

            this.filter.url = url;

            this.filter.getAll().subscribe({
              next: (data) => {
                this.products = data;
                this.topSelected.emit(this.products); // Emit the products after fetching
                console.log('Products with selected style', this.products);
              },
              error: (err) => {
                console.log('Error fetching products for selected style:', err);
              },
            });
          }
        }

      } else {
        console.log('No categoryId found in productSelected');
      }
    } else {
      console.log('No styles selected');
    }

    this.close();
  }

  clearSelection(): void {
    this.selectedTop = [];
    console.log('Selection cleared');
  }

  isStyleSelected(style: string): boolean {
    return this.selectedTop.includes(style);
  }
}
