import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { Productsearch } from '../../viewmodels/product-search';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductModule } from '../../../product/product.module';
import { ColorModalComponent } from '../color-modal/color-modal.component';
import { PriceModalComponent } from '../price-modal/price-modal.component';
import { ShoesizeModalComponent } from '../shoesize-modal/shoesize-modal.component';
import { SizeModalComponent } from '../size-modal/size-modal.component';
import { StyleModalComponent } from '../style-modal/style-modal.component';
import { TopModalComponent } from '../top-modal/top-modal.component';
import { MaterialModalComponent } from '../material-modal/material-modal.component';

@Component({
  selector: 'app-productfilter',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    ColorModalComponent,
    PriceModalComponent,
    ShoesizeModalComponent,
    MaterialModalComponent,
    SizeModalComponent,
    StyleModalComponent,
    TopModalComponent,
    ProductModule,
  ],
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.css'],
})
export class ProductfilterComponent {
  products: any[] = [];
  hideFilters: boolean = false;
  selectedButton: string = 'VIEW ALL'; // Default selected button
  product3: Productsearch[] = [];

  @ViewChild('colorModal') colorModal!: ColorModalComponent;
  @ViewChild('materialModal') materialModal!: MaterialModalComponent;
  @ViewChild('styleModal') styleModal!: StyleModalComponent;
  @ViewChild('topModal') topModal!: TopModalComponent;
  @ViewChild('sizeModal') sizeModal!: SizeModalComponent;
  @ViewChild('shsizeModal') shsizeModal!: ShoesizeModalComponent;
  @ViewChild('priceModal') priceModal!: PriceModalComponent;

  constructor(
    private route: ActivatedRoute,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['products']) {
        this.products = JSON.parse(params['products']);
        console.log('Received Products from query params:', this.products);
      }
    });
  }

  openModal(item: string): void {
    this.selectedButton = item;
    const modalsMap: { [key: string]: any } = {
      COLOUR: this.colorModal,
      MATERIALS: this.materialModal,
      STYLE: this.styleModal,
      'TYPE OF PRODUCT': this.topModal,
      SIZE: this.sizeModal,
      'SHOE SIZES': this.shsizeModal,
      PRICE: this.priceModal,
    };

    const modal = modalsMap[item];
    if (modal) modal.open();

    if (item === 'DENIM') this.applyFilter('DENIM');
    if (item === 'JACKETS | COATS') this.applyMultipleFilters([38, 39]);
    if (item === 'SHOES | BAGS') this.applyFilterByCategory(53);
    if (item === 'ACCESSORIES | PERFUMES') this.applyMultipleFilters([44, 55]);
  }

  applyFilter(material: string): void {
    if (this.products.length > 0) {
      const categoryId = this.products[0]?.categoryId || null;
      if (categoryId) {
        this.filterService
          .fetchProductsByMaterial(categoryId, material)
          .subscribe({
            next: (data) => {
              console.log(`Filtered products for ${material}:`, data);
            },
            error: (err) =>
              console.log(`Error fetching ${material} products:`, err),
          });
      }
    }
  }

  applyMultipleFilters(categoryIds: number[]): void {
    this.filterService
      .fetchProductsByMultipleCategories(categoryIds)
      .subscribe({
        next: (data) => {
          this.product3 = data;
          console.log(
            `Combined products for categories ${categoryIds.join(', ')}:`,
            this.product3
          );
        },
        error: (err) =>
          console.log('Error fetching products for categories:', err),
      });
  }

  applyFilterByCategory(categoryId: number): void {
    this.filterService.fetchProductsByCategory(categoryId).subscribe({
      next: (data) => {
        this.product3 = data;
        console.log(
          `Filtered products for category ${categoryId}:`,
          this.product3
        );
      },
      error: (err) =>
        console.log(
          `Error fetching products for category ${categoryId}:`,
          err
        ),
    });
  }

  productvc: Productsearch | null = null;

  handleColorSelection(color: Productsearch): void {
    // Reset productvc to null before assigning the new color
    this.productvc = this.filterService.clearProductvc();
    this.productvc = color; // Assign the new value
    console.log('color product v ', color);
  }

  handleMaterialSelection(selectedMaterials: Productsearch): void {
    this.productvc = this.filterService.clearProductvc();
    this.productvc = selectedMaterials; // Assign the new value
    console.log('Selected materials:', selectedMaterials);
  }

  handleStyleSelection(selectedstyle: Productsearch): void {
    this.productvc = this.filterService.clearProductvc();
    this.productvc = selectedstyle; // Assign the new value
    console.log('Selected Style:', selectedstyle);
  }

  handletopSelection(selectedtop: Productsearch): void {
    this.productvc = this.filterService.clearProductvc();
    this.productvc = selectedtop; // Assign the new value
    console.log('Selected type of product:', selectedtop);
  }

  handlesizeSelection(selectedsize: Productsearch): void {
    this.productvc = this.filterService.clearProductvc();
    this.productvc = selectedsize; // Assign the new value
    console.log('Selected size:', selectedsize);
  }

  handleshsizeSelection(selectedshsize: Productsearch): void {
    this.productvc = this.filterService.clearProductvc();
    this.productvc = selectedshsize; // Assign the new value
    console.log('Selected size:', selectedshsize);
  }

  handleshpriceSelection(selectedshprice: Productsearch): void {
    
    this.productvc = selectedshprice; // Assign the new value
    console.log('Selected size:', selectedshprice);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    
    // Check scroll position and toggle filters visibility
    if (scrollPosition > 32) { // Adjust the scroll threshold as needed
      this.hideFilters = true;
    } else {
      this.hideFilters = false;
    }
  }

}
