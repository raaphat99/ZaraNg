import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.css'] // تأكد من تصحيح الاسم هنا
})
export class PriceModalComponent {
  minPrice: number = 390;  // السعر الأدنى
  maxPrice: number = 22990; // السعر الأعلى
  startPrice: number = this.minPrice; // بداية السعر
  endPrice: number = this.maxPrice;   // نهاية السعر

  isopen: boolean = false;
  selectedstyle: string[] = [];
  
  initialStartPrice: number = this.minPrice; // القيم الافتراضية لبداية السعر
  initialEndPrice: number = this.maxPrice;   // القيم الافتراضية لنهاية السعر

  @Output() priceSelected = new EventEmitter<Productsearch>(); 
  @Input() productselected: Productsearch[] = []; 

  constructor(public filter: FilterService) {}

  open(): void {
    this.isopen = true;
  }

  close(): void {
    console.log('Modal closed'); 
    this.isopen = false;
  }

  ngOnInit(): void {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    if (window.innerWidth < 700 && this.isopen) {
      this.close();
    }
  }

  updatePrices() {
    // ضمان أن startPrice لا يتجاوز endPrice
    if (this.startPrice > this.endPrice) {
      this.startPrice = this.endPrice;
    }
  }

  emitPriceSelection() {
  }
  products: Productsearch = new Productsearch(0, 0, "", 0, "", 0, 0, 0, 0, 0);
  viewResults(): void {
    const categoryId = this.productselected.length > 0 ? this.productselected[0].categoryId : null;

    if (categoryId !== null) {
      this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&priceFrom=${this.startPrice}&priceTo=${this.endPrice}`;
      console.log('Fetching URL:', this.filter.url);
      this.products=new Productsearch(0, 0, "", 0, "", 0, 0, 0, 0, 0); 
      this.filter.getAll().subscribe({
        next: data => {
          this.products = data;
          this.priceSelected.emit(this.products);

          console.log("Products with selected sizes", this.products);
        },
        error: err => {
          console.error('Error fetching products for selected sizes:', err);
        }
      });
      this.priceSelected.emit(this.products);

    } else {
      console.error('No categoryId found in productselected');
    }
  }

  clearSelection() {
    // إعادة تعيين قيم الـ slider إلى القيم الافتراضية
    this.startPrice = this.minPrice;
    this.endPrice = this.maxPrice;
    this.selectedstyle = [];
    console.log('Selection cleared'); 
  }

  isStyleSelected(style: string): boolean {
    return this.selectedstyle.includes(style);
  }

  isClearDisabled(): boolean {
    console.log((this.startPrice === this.minPrice && this.endPrice === this.maxPrice));
    return this.startPrice === this.minPrice && this.endPrice === this.maxPrice;
  }
}

// تعريف الكلاس Productsearch
class Productsearch {
  constructor(
    public id: number, 
    public productId: number, 
    public productName: string, 
    public sizeId: number, 
    public sizeValue: string,
    public price: number, 
    public stockQuantity: number, 
    public productColor: number, 
    public productMaterial: number, 
    public categoryId: number
  ) {}
}
