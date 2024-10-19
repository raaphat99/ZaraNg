import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Productsearch } from '../../viewmodels/product-search';
import { ProductColor } from '../../viewmodels/product-color';
import { colorPalette } from '../../static-data/color-palette';

@Component({
  selector: 'app-color-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-modal.component.html',
  styleUrl: './color-modal.component.css',
})
export class ColorModalComponent {
  products: Productsearch;
  isOpen: boolean = false;
  selectedColors: string[] = [];
  selectedCategoryId: number = 0;

  colors: ProductColor[] = colorPalette;

  @Output() colorSelected = new EventEmitter<Productsearch>();
  @Input() productselected: Productsearch[] = [];

  constructor(public filter: FilterService) {
    this.products = this.filter.clearProductvc();
  }

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  toggleColorSelection(color: string): void {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
  }

  clearSelection(): void {
    this.selectedColors = [];
  }

  // Keeping the viewResults method inside the component as per the requirement
  viewResults(): void {
    if (this.selectedColors.length >= 1) {
      const selectedColorNames = this.selectedColors
        .map((hslValue) => {
          const color = this.colors.find((color) => color.hsl === hslValue);
          return color ? color.name : null;
        })
        .filter((name) => name !== null);

      const colorParams = selectedColorNames
        .map((name) => `colors=${name}`)
        .join('&');

      if (this.productselected.length > 0 && this.selectedCategoryId) {
        const categoryId = this.selectedCategoryId;

        this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${colorParams}`;
        console.log('Generated URL:', this.filter.url);
      } else {
        console.warn('No products selected or category ID is missing.');
      }
    }
    this.close();
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    if (window.innerWidth < 700 && this.isOpen) {
      this.close();
    }
  }
}


