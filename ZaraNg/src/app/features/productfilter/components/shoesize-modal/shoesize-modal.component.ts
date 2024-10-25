import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule, formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product2 } from '../productfilter/productfilter.component';
import { concatMap, EMPTY, forkJoin } from 'rxjs';

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
  
  @Output() shsizeSelected = new EventEmitter<Productsearch[]>(); // توحيد التسمية
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

  products: Productsearch[]=[];
  test:Productsearch|null=null;


  // viewResults(): void {
  //   // التأكد من أن هناك أحجام مختارة
  //   if (this.selectedstyle.length > 0) {
  //     // بناء معلمات الأحجام
  //     const sizeParams = this.selectedstyle
  //       .map(style => `sizes=${style}`)
  //       .join('&');
  
  //     // التأكد من وجود منتجات مختارة
  //     if (this.productselected.length > 0) {
  //       this.products = []; // تفريغ قائمة المنتجات قبل طلب البيانات الجديدة
  
  //       // التكرار على كل منتج مختار
  //       for (let index = 0; index < this.productselected.length; index++) {
  //         const productId = this.productselected[index].id; // الحصول على معرف المنتج
  //         this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`; // بناء الرابط للحصول على تفاصيل المنتج
  //         console.log("Fetching product details URL:", this.filter.url); // تحقق من الرابط النهائي
  
  //         // طلب الحصول على تفاصيل المنتج
  //         this.filter.getAll().subscribe({
  //           next: data => {
  //             this.test = data; // تعيين القيمة بشكل صحيح
  
  //             // الوصول الصحيح إلى categoryId
  //             const categoryId = this.test?.categoryId; // تأكد من أن الحقل صحيح
  
  //             // التحقق من وجود categoryId
  //             if (categoryId !== undefined) {
  //               // بناء الرابط باستخدام categoryId ومعلمات الأحجام
  //               this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;
  //               console.log('Fetching URL for products with selected sizes:', this.filter.url);
  
  //               // طلب الحصول على المنتجات بناءً على الرابط الجديد
  //               this.filter.getAll().subscribe({
  //                 next: data => {
  //                   this.products.push(...data); // إضافة المنتجات المستلمة إلى القائمة
  //                   this.shsizeSelected.emit(this.products); // Emit the selected sizes
  
  //                   console.log(`Products for product ID ${productId}:`, data);
  //                 },
  //                 error: err => {
  //                   this.shsizeSelected.emit(this.products);
  //                   console.log(`Error fetching products for product ID ${productId}:`, err);
  //                 }
  //               });
  //             } else {
  //               console.log(`CategoryId is undefined for product ID ${productId}`);
  //             }
  //           },
  //           error: err => {
  //             console.log('Error fetching product details:', err);
  //           }
  //         });
  //       }
  //     } else {
  //       console.log('No products selected.');
  //     }
  //   } else {
  //     console.log('No sizes selected.');
  //   }
  // }


  viewResults(): void {
    // التأكد من أن هناك أحجام مختارة
    if (this.selectedstyle.length > 0) {
      // بناء معلمات الأحجام
      const sizeParams = this.selectedstyle
        .map(style => `sizes=${style}`)
        .join('&');
  
      // التأكد من وجود منتجات مختارة
      if (this.productselected.length > 0) {
        this.products = []; // تفريغ قائمة المنتجات قبل طلب البيانات الجديدة
  
        // إعداد قائمة من الطلبات
        const requests = this.productselected.map(product => {
          const productId = product.id; // الحصول على معرف المنتج
          this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`; // بناء الرابط للحصول على تفاصيل المنتج
          console.log("Fetching product details URL:", this.filter.url); // تحقق من الرابط النهائي
  
          // طلب الحصول على تفاصيل المنتج
          return this.filter.getAll().pipe(
            concatMap(data => {
              const categoryId = data?.categoryId; // الوصول الصحيح إلى categoryId
              if (categoryId !== undefined) {
                // بناء الرابط باستخدام categoryId ومعلمات الأحجام
                this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${sizeParams}`;
                console.log('Fetching URL for products with selected sizes:', this.filter.url);
                return this.filter.getAll(); // إرجاع الطلب الجديد
              } else {
                console.log(`CategoryId is undefined for product ID ${productId}`);
                return EMPTY; // إعادة EMPTY بدلاً من مصفوفة فارغة
              }
            })
          );
        });
  
        // استخدام forkJoin لجمع جميع الطلبات
        forkJoin(requests).subscribe({
          next: results => {
            results.forEach(productsData => {
              if (productsData && productsData.length > 0) {
                this.products.push(...productsData); // إضافة المنتجات المستلمة إلى القائمة
              }
            });
            this.shsizeSelected.emit(this.products); // Emit the selected sizes
            console.log("Products fetched successfully:", this.products);
          },
          error: err => {
            console.log('Error fetching products for selected sizes:', err);
          }
        });
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

