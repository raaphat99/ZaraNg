import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { FilterService } from '../../services/filter.service';
import { Product2 } from '../productfilter/productfilter.component';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-color-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './color-modal.component.html',
  styleUrl: './color-modal.component.css'
})
export class ColorModalComponent {
  isOpen: boolean = false;
  colors: { name: string, hsl: string }[] = [
    { name: 'ANIMAL PRINT', hsl: 'hsl(30, 70%, 50%)' }, // يمكنك استخدام قيمة مناسبة هنا
    { name: 'Beige', hsl: 'hsl(60, 60%, 80%)' },
    { name: 'Black', hsl: 'hsl(0, 0%, 0%)' },
    { name: 'Blue', hsl: 'hsl(210, 100%, 50%)' },
    { name: 'Brown', hsl: 'hsl(30, 60%, 40%)' },
    { name: 'Burgundy', hsl: 'hsl(0, 100%, 25%)' },
    { name: 'Golden', hsl: 'hsl(45, 100%, 50%)' },
    { name: 'White', hsl: 'hsl(0, 0%, 100%)' },
    { name: 'Green', hsl: 'hsl(120, 100%, 40%)' },
    { name: 'Grey', hsl: 'hsl(0, 0%, 70%)' },
    { name: 'Khaki', hsl: 'hsl(60, 30%, 50%)' },
    { name: 'Metallic', hsl: 'hsl(0, 0%, 50%)' }, // يمكن استخدام قيمة مخصصة هنا
    { name: 'Neon', hsl: 'hsl(120, 100%, 50%)' }, // اجعلها أكثر إشراقًا
    { name: 'Orange', hsl: 'hsl(30, 100%, 50%)' },
    { name: 'Pink', hsl: 'hsl(330, 100%, 50%)' },
    { name: 'Printed', hsl: 'hsl(0, 0%, 60%)' }, // يمكنك استخدام قيمة مخصصة هنا
    { name: 'Purple', hsl: 'hsl(270, 100%, 50%)' },
    { name: 'Red', hsl: 'hsl(0, 100%, 50%)' },
    { name: 'Silver', hsl: 'hsl(0, 0%, 75%)' },
    { name: 'Tan', hsl: 'hsl(30, 40%, 70%)' },
    { name: 'Yellow', hsl: 'hsl(60, 100%, 50%)' },
  ];
  
  @Output() colorSelected = new EventEmitter<Productsearch[]>();
  @Input() productselected: Product2[]=[]; 
  
  open(): void {
    this.isOpen = true;
  }
 
  close(): void {
    this.isOpen = false;
  }

  selectColor(color: string): void {

  }
  selectedColors: string[] = []; // قائمة الألوان المختارة

toggleColorSelection(color: string): void {
  const index = this.selectedColors.indexOf(color);
  if (index > -1) {
    this.selectedColors.splice(index, 1); // إزالة اللون إذا كان موجودًا
  } else {
    this.selectedColors.push(color); // إضافة اللون إذا لم يكن موجودًا
  }
}

clearSelection(): void {
  this.selectedColors = []; 
}
constructor(public filter:FilterService){}


test:Productsearch|null=null;
products:Productsearch[]=[];
selectedCategoryId: number = 0; // يمكنك تحديد قيمة افتراضية للفئة

// viewResults(): void {
//   if (this.selectedColors.length >= 1) {
//     // بناء معلمات الألوان باستخدام الأسماء
//     const selectedColorNames = this.selectedColors
//       .map(hslValue => {
//         const color = this.colors.find(color => color.hsl === hslValue);
//         return color ? color.name : null;
//       })
//       .filter(name => name !== null); // تأكد من تصفية الأسماء الغير موجودة

//     // بناء رابط مع تكرار معلمة "colors" لكل لون
//     const colorParams = selectedColorNames.map(name => `colors=${name}`).join('&');
//     console.log("productselected:", this.productselected);

//     // تأكد من أن productselected يحتوي على كائنات يمكن الوصول إلى categoryId منها
//     if (this.productselected.length > 0) {
//       for (let index = 0; index < this.productselected.length; index++) {
//         const productId = this.productselected[index].id; // الحصول على معرف المنتج
//         this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;
        
//         this.filter.getAll().subscribe({
//           next: data => {
//             this.test = data; // تعيين القيمة بشكل صحيح
            
//             // Correct access to categoryId
//             const categoryId = this.test?.categoryId; // Ensure this is the correct case
            
//             if (categoryId !== undefined) {
//               this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${colorParams}`;
//               console.log('URL: ', this.filter.url);
              
//               this.filter.getAll().subscribe({
//                 next: data => {
//                   this.products.push(...data); // استخدم push بدلاً من append
//                   this.colorSelected.emit(this.products);
//                   console.log("Products with selected colors", this.products);
//                 },
               
//               });
//             } else {
//               console.log('CategoryId is undefined for product:', this.test);
//             }
//           },
//           error: err => {
//             console.log('Error fetching product details:', err);
//           }
//         });
//       }
//     } else {
//       console.error('No products selected.');
//     }
//   } else {
//     console.error('No colors selected.');
//   }
// }

viewResults(): void {
  if (this.selectedColors.length >= 1) {
    // بناء معلمات الألوان باستخدام الأسماء
    const selectedColorNames = this.selectedColors
      .map(hslValue => {
        const color = this.colors.find(color => color.hsl === hslValue);
        return color ? color.name : null;
      })
      .filter(name => name !== null); // تأكد من تصفية الأسماء الغير موجودة

    // بناء رابط مع تكرار معلمة "colors" لكل لون
    const colorParams = selectedColorNames.map(name => `colors=${name}`).join('&');
    console.log("productselected:", this.productselected);

    // تأكد من أن productselected يحتوي على كائنات يمكن الوصول إلى categoryId منها
    if (this.productselected.length > 0) {
      const requests: Observable<Productsearch[]>[] = this.productselected.map(product => {
        const productId = product.id; // الحصول على معرف المنتج
        this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;

        return this.filter.getAll().pipe(
          switchMap(data => {
            const categoryId = data?.categoryId; // تأكد من الحصول على categoryId بشكل صحيح
            
            if (categoryId !== undefined) {
              this.filter.url =  `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${colorParams}`;
              console.log('URL: ', this.filter.url);
              return this.filter.getAll(); // إرجاع Observable<Productsearch[]> مباشرة
            } else {
              console.log('CategoryId is undefined for product:', data);
              return of([] as Productsearch[]); // إرجاع مصفوفة فارغة من النوع Productsearch
            }
          }),
          catchError(err => {
            console.error('Error fetching product details:', err);
            return of([] as Productsearch[]); // إرجاع مصفوفة فارغة في حالة الخطأ
          })
        );
      });

      // استخدام forkJoin لجمع جميع الطلبات
      forkJoin(requests).subscribe({
        next: allProducts => {
          const flattenedProducts = allProducts.flat(); // تسطيح المصفوفة
          this.products.push(...flattenedProducts); // استخدم push لدمج المنتجات
          this.colorSelected.emit(this.products); // Emit once after all requests
          console.log("Products with selected colors", this.products);
        },
        error: err => {
          console.error('Error fetching products:', err);
        }
      });
    } else {
      console.error('No products selected.');
    }
  } else {
    console.error('No colors selected.');
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
  if (window.innerWidth < 700 && this.isOpen) {
    this.close();
  }
}
// viewResults(): void {
//   if (this.selectedColors.length >= 1) {
//     const selectedColorNames = this.selectedColors
//       .map(hslValue => {
//         const color = this.colors.find(color => color.hsl === hslValue);
//         return color ? color.name : null;
//       })
//       .filter(name => name !== null);

//     const colorParams = selectedColorNames.map(name => `colors=${name}`).join('&');
//     console.log("productselected:", this.productselected);

//     if (this.productselected.length > 0) {
//       for (let index = 0; index < this.productselected.length; index++) {
//         const productId = this.productselected[index].id;
//         this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;

//         this.filter.getAll().subscribe({
//           next: data => {
//             this.test = data;
//             const categoryId = this.test?.categoryId;

//             if (categoryId !== undefined) {
//               this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${colorParams}`;
//               console.log('URL: ', this.filter.url);

//               this.filter.getAll().subscribe({
//                 next: (data: Productsearch[]) => {
//                   // Ensure no duplicates before pushing the products
//                   data.forEach((product: Productsearch) => {
//                     const exists = this.products.some((existingProduct: Productsearch) => existingProduct.id === product.id);
//                     if (!exists) {
//                       this.products.push(product);
//                     }
//                   });

//                   console.log("Products with selected colors", this.products);
//                 },
//               });
//             } else {
//               console.log('CategoryId is undefined for product:', this.test);
//             }
//           },
//           error: err => {
//             console.log('Error fetching product details:', err);
//           }
//         });
//       }
//     } else {
//       console.error('No products selected.');
//     }
//   } else {
//     console.error('No colors selected.');
//   }
//   this.colorSelected.emit(this.products);
// }


} 
class Productsearch{
  constructor(public id:number,public productId:number,public productName:string ,public sizeId:number,public sizeValue:string,
    public price:number,public stockQuantity:number,public productColor:number,public productMaterial:number,
    public categoryId:number
  ){}
}
