import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product2 } from '../productfilter/productfilter.component';
import { concatMap, EMPTY, forkJoin, map } from 'rxjs';

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

  @Output() priceSelected = new EventEmitter<Productsearch[]>(); 
  @Input() productselected: Product2[]=[]; 

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
  products: Productsearch[]=[];
  test:Productsearch|null=null;

  
  // viewResults(): void {
  //   if (this.productselected.length > 0) {
  //     this.products = []; // تفريغ القائمة قبل إضافة المنتجات الجديدة
  
  //     // بناء معلمات السعر
  //     const priceParams = `priceFrom=${this.startPrice}&priceTo=${this.endPrice}`;
  //     console.log("productselected:", this.productselected);
  
  //     // التأكد من أن productselected يحتوي على كائنات يمكن الوصول إلى categoryId منها
  //     for (let index = 0; index < this.productselected.length; index++) {
  //       const productId = this.productselected[index].id; // الحصول على معرف المنتج
  //       this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;
  //       console.log(" this.filter.url"+ this.filter.url);
  //       this.filter.getAll().subscribe({
  //         next: data => {
  //           this.test = data; // تعيين القيمة بشكل صحيح
  
  //           // Correct access to categoryId
  //           const categoryId = this.test?.categoryId; // تأكد من أن الحقل صحيح
  
  //           if (categoryId !== undefined) {
  //             // بناء الرابط باستخدام categoryId ومعلمات السعر
  //             this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${priceParams}`;
  //             console.log('Fetching URL for product:', this.filter.url);
  
  //             this.filter.getAll().subscribe({
  //               next: data => {
  //                 this.products.push(...data); // استخدم push لإضافة المنتجات
  //                 this.priceSelected.emit(this.products);
  //                 console.log("Products with selected price range", this.products);
  //               },
  //               error: err => {
  //                 this.priceSelected.emit(this.products);
  //                 console.log('Error fetching products for selected price range:', err);
  //               }
  //             });
  //           } else {
  //             console.log('CategoryId is undefined for product:', this.test);
  //           }
  //         },
  //         error: err => {
  //           console.log('Error fetching product details:', err);
  //         }
  //       });
  //     }
  //   } else {
  //     console.error('No products selected.');
  //   }
  // }
  viewResults(): void {
    if (this.productselected.length > 0) {
      this.products = []; // تفريغ القائمة قبل إضافة المنتجات الجديدة
  
      // بناء معلمات السعر
      const priceParams = `priceFrom=${this.startPrice}&priceTo=${this.endPrice}`;
      console.log("productselected:", this.productselected);
  
      // إعداد قائمة من الطلبات
      const requests = this.productselected.map(product => {
        const productId = product.id; // الحصول على معرف المنتج
        this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;
        console.log("this.filter.url: " + this.filter.url);
  
        // طلب الحصول على تفاصيل المنتج
        return this.filter.getAll().pipe(
          concatMap(data => {
            const categoryId = data?.categoryId; // تأكد من أن الحقل صحيح
            if (categoryId !== undefined) {
              // بناء الرابط باستخدام categoryId ومعلمات السعر
              this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${priceParams}`;
              console.log('Fetching URL for product:', this.filter.url);
              return this.filter.getAll(); // إرجاع الطلب الجديد
            } else {
              console.log('CategoryId is undefined for product:', data);
              return EMPTY; // إعادة EMPTY بدلاً من مصفوفة فارغة
            }
          })
        );
      });
  
      // استخدام forkJoin لجمع جميع الطلبات
      forkJoin(requests).subscribe({
        next: results => {
          results.forEach(productsData => {
            if (productsData) {
              this.products.push(...productsData); // دمج البيانات
            }
          });
          this.priceSelected.emit(this.products); // إرسال النتائج النهائية
          console.log("Products with selected price range", this.products);
        },
        error: err => {
          console.log('Error fetching products for selected price range:', err);
        }
      });
    } else {
      console.error('No products selected.');
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
