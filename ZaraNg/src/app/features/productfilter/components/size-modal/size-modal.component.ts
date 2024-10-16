import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-size-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './size-modal.component.html',
  styleUrls: ['./size-modal.component.css'] // تم تصحيح الاسم هنا
})
export class SizeModalComponent {

  sizes: string[] = [
    'Small',
    'Medium',
    'Large',
    'ExtraLarge',
  ];
  
  isopen: boolean = false;
  selectedstyle: string[] = [];
  
  @Output() sizeSelected = new EventEmitter<Productsearch>(); // توحيد التسمية
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
  products: Productsearch = new Productsearch(0, 0, "", 0, "", 0, 0, 0, 0, 0);
  viewResults(): void {
    if (this.selectedstyle.length > 0) {
      const sizeParams = this.selectedstyle
        .map(style => `sizes=${style}`) 
        .join('&'); 
    
      const categoryId = this.productselected.length > 0 ? this.productselected[0].categoryId : null;
    
      if (categoryId !== null) {
        this.products=new Productsearch(0, 0, "", 0, "", 0, 0, 0, 0, 0);
        this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;
    
        console.log('Fetching URL:', this.filter.url); // تحقق من الرابط النهائي
    
        this.filter.getAll().subscribe({
          next: data => {
            this.products = data;
            this.sizeSelected.emit(this.products); // Emit the selected styles
 
            console.log("Products with selected sizes", this.products);
          },
          error: err => {
            console.error('Error fetching products for selected sizes:', err);
          }
        });
        this.sizeSelected.emit(this.products); // Emit the selected styles

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
