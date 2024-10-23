import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { FilterService } from '../../services/filter.service';

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
  
  @Output() colorSelected = new EventEmitter<Productsearch>();

  @Input() productselected: Productsearch[]=[]; 
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



products:Productsearch=new Productsearch(0,0,"",0,"",0,0,0,0,0);
selectedCategoryId: number = 0; // يمكنك تحديد قيمة افتراضية للفئة

viewResults(): void {
  if (this.selectedColors.length >= 1) {
    // قم بتحويل قيم HSL إلى أسماء الألوان
    const selectedColorNames = this.selectedColors
      .map(hslValue => {
        const color = this.colors.find(color => color.hsl === hslValue);
        return color ? color.name : null; // استخدم null إذا لم يتم العثور على اللون
      })
      .filter(name => name !== null); // إزالة null من النتائج
  
    // إنشاء المعلمات الخاصة بالألوان
    const colorParams = selectedColorNames.map(name => `colors=${name}`).join('&');
  
    // التحقق من وجود منتجات مختارة وإنشاء URL
    if (this.productselected.length > 0 && this.selectedCategoryId) {
      // التحقق من أن categoryId ليس فارغًا
      const categoryId = this.selectedCategoryId; // تأكد من أن categoryId مأخوذ من مكان صحيح
  
      // إنشاء الرابط مع categoryId ومعلمات الألوان
      this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${colorParams}`;
      console.log('Generated URL:', this.filter.url); // طباعة URL للتحقق
    } else {
      console.warn('No products selected or category ID is missing.');
    }
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


} 
class Productsearch{
  constructor(public id:number,public productId:number,public productName:string ,public sizeId:number,public sizeValue:string,
    public price:number,public stockQuantity:number,public productColor:number,public productMaterial:number,public categoryId:number
  ){}
}
