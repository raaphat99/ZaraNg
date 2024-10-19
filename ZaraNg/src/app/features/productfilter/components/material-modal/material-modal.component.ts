import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { Productsearch } from '../../viewmodels/product-search';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-material-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.scss']
})
export class MaterialModalComponent {
  products: Productsearch;
  isOpen: boolean = false;
  selectedMaterials: string[] = [];

  @Input() productselected: Productsearch[] = [];
  @Output() materialSelected = new EventEmitter<Productsearch>();

  materials: string[] = [
    'Cotton', 'Polyester', 'TheSkin', 'Rafia', 'Leather', 'Burlap', 'Lstered', 'Vinyl', 
    'Linen', 'Shiny', 'Sequins', 'TedSkin', 'Denim', 'Wool', 'Viscose', 'Elastane', 'Silk'
  ];

  constructor(public filter: FilterService) {
    this.products = this.filter.clearProductvc();
  }

  // Modal controls
  open(): void {
    this.isOpen = true;
  }

  close(): void {
    console.log('Modal closed');
    this.isOpen = false;
  }

  // Toggle material selection
  toggleMaterial(material: string): void {
    const index = this.selectedMaterials.indexOf(material);
    if (index === -1) {
      this.selectedMaterials.push(material);
    } else {
      this.selectedMaterials.splice(index, 1);
    }
  }

  // View products with selected materials
  viewResults(): void {
    if (this.selectedMaterials.length > 0) {
      const materialParams = this.selectedMaterials.map(material => `materials=${material}`).join('&');

      const categoryId = this.getCategoryId();

      if (categoryId !== null) {
        const filterUrl = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${materialParams}`;
        console.log('Fetching URL:', filterUrl);

        this.fetchFilteredProducts(filterUrl);
      } else {
        console.error('No categoryId found in productselected');
      }
    }
    this.close();
  }

  // Fetch filtered products from the API
  private fetchFilteredProducts(url: string): void {
    this.filter.getAll().subscribe({
      next: data => {
        this.products = data;
        this.materialSelected.emit(this.products);
        console.log("Products with selected materials:", this.products);
      },
      error: err => {
        console.error('Error fetching products for selected materials:', err);
      }
    });
  }

  // Clear all selected materials
  clearSelection(): void {
    this.selectedMaterials = [];
  }

  // Get category ID from selected products
  private getCategoryId(): number | null {
    return this.productselected.length > 0 ? this.productselected[0].categoryId : null;
  }

  // Responsive design adjustments
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkWindowSize();
  }

  private checkWindowSize(): void {
    if (window.innerWidth < 700 && this.isOpen) {
      this.close();
    }
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }
}
