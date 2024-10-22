import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product2 } from '../productfilter/productfilter.component';

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
  
  @Output() sizeSelected = new EventEmitter<Productsearch[]>(); // توحيد التسمية
  @Input() productselected: Product2[]=[]; 





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
  products: Productsearch []=[];
  test:Productsearch|null=null;

  viewResults(): void {
    // التأكد من أن هناك أحجام مختارة
    if (this.selectedstyle.length > 0) {
      // تفريغ قائمة المنتجات قبل طلب البيانات الجديدة
      this.products = [];
  
      // بناء معلمات الأحجام باستخدام selectedstyle
      const sizeParams = this.selectedstyle
        .map(style => `sizes=${style}`)
        .join('&'); // دمج الأحجام المختارة في سلسلة واحدة مع استخدام "&" كفاصل
  
      // التأكد من أن هناك منتجات مختارة
      if (this.productselected.length > 0) {
        console.log("productselected:", this.productselected);
  
        // التكرار على كل منتج مختار
        for (let index = 0; index < this.productselected.length; index++) {
          const productId = this.productselected[index].id; // الحصول على معرف المنتج
          this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;
          console.log("Fetching product details URL:", this.filter.url); // تحقق من الرابط النهائي
  
          // طلب الحصول على تفاصيل المنتج
          this.filter.getAll().subscribe({
            next: data => {
              this.test = data; // تعيين القيمة بشكل صحيح
  
              // الوصول الصحيح إلى categoryId
              const categoryId = this.test?.categoryId; // تأكد من أن الحقل صحيح
  
              if (categoryId !== undefined) {
                // بناء الرابط باستخدام categoryId ومعلمات الأحجام
                this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;
                console.log('Fetching URL for products with selected sizes:', this.filter.url);
  
                // طلب الحصول على المنتجات بناءً على الرابط الجديد
                this.filter.getAll().subscribe({
                  next: data => {
                    this.products.push(...data); // إضافة المنتجات المستلمة إلى القائمة
                    this.sizeSelected.emit(this.products); // Emit the selected sizes
  
                    console.log(`Products for product ID ${productId}:`, data);
                  },
                  error: err => {
                    this.sizeSelected.emit(this.products);
                    console.log(`Error fetching products for product ID ${productId}:`, err);
                  }
                });
              } else {
                console.log('CategoryId is undefined for product:', this.test);
              }
            },
            error: err => {
              console.log('Error fetching product details:', err);
            }
          });
        }
      } else {
        console.log('No products selected.');
      }
    } else {
      console.log('No sizes selected.');
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
