import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule, formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shoesize-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shoesize-modal.component.html',
  styleUrl: './shoesize-modal.component.css'
})
export class ShoesizeModalComponent {
  sizes: string[] = [
    '36',
    '38',
    '40',
    '42',
  ];
  
  isopen: boolean = false;
  selectedstyle: string[] = [];
  
  @Output() shsizeSelected = new EventEmitter<Productsearch>(); // توحيد التسمية
  @Input() productselected: Productsearch[] = []; 

  constructor(public filter: FilterService) {}

  open(): void {
    this.isopen = true;
  }

  close(): void {
    console.log('Modal closed'); 
    this.isopen = false;
  }

  toggleStyle(style: string) {
    const index = this.selectedstyle.indexOf(style);
    if (index === -1) {
      this.selectedstyle.push(style);
    } else {
      this.selectedstyle.splice(index, 1);
    }
  }

  products: Productsearch = new Productsearch(0, 0, "", 0, "", 0, 0, 0, 0, 0);


  viewResults(): void {
    if (this.selectedstyle.length > 0) {
      const sizeParams = this.selectedstyle
        .map(style => `sizes=${style}`) 
        .join('&'); 
    
    
      const categoryId = this.productselected.length > 0 ? this.productselected[0].categoryId : null;
    
      if (categoryId !== null) {
        // بناء الرابط النهائي باستخدام categoryId ومعلمات "sizes"
        this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;

        console.log('Fetching URL:', this.filter.url); 
    
        // إرسال الطلب إلى الـ API
        this.filter.getAll().subscribe({
          next: data => {
            this.products = data; 
            this.shsizeSelected.emit(this.products); 

            console.log("Products with selected sizes", this.products);
          },
          error: err => {
            console.error('Error fetching products for selected sizes:', err);
          }
        });
        this.shsizeSelected.emit(this.products); 

      } else {
        console.error('No categoryId found in productselected');
      }
    } else {
      console.log('No styles selected');
    }
  }
  
  

  clearSelection() {
    this.selectedstyle = [];
    console.log('Selection cleared'); 
  }

  isStyleSelected(style: string): boolean {
    return this.selectedstyle.includes(style);
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

