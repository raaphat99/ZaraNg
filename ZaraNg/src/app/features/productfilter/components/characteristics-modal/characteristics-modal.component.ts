import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Product2 } from '../productfilter/productfilter.component';

@Component({
  selector: 'app-characteristics-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './characteristics-modal.component.html',
  styleUrls: ['./characteristics-modal.component.css']
})
export class CharacteristicsModalComponent {
  characteristics: string[] = [
    'Cotton',
    'Polyester',
    'TheSkin',
    'Rafia',
    'Leather',
    'Burlap',
    'Lstered',
    'Vinyl',
    'Linen',
    'Shiny',
    'Sequins',
    'TedSkin',
    'Denim',
    'Wool',
    'Viscose',
    'Elastane',
    'Silk'
  ];
  
  isopen: boolean = false;
  selectedCharacteristics: string[] = [];
  
  @Output() characteristicsSelected = new EventEmitter<Productsearch[]>();
  @Input() productselected: Product2[]=[]; 

  constructor(public filter: FilterService) {}

  open(): void {
    this.isopen = true;
  }

  close(): void {
    console.log('Modal closed'); // للتحقق من استدعاء الدالة
    this.isopen = false;
  }

  toggleCharacteristic(characteristic: string) {
    const index = this.selectedCharacteristics.indexOf(characteristic);
    if (index === -1) {
      this.selectedCharacteristics.push(characteristic);
    } else {
      this.selectedCharacteristics.splice(index, 1);
    }
  }

  products: Productsearch[]=[];
  test:Productsearch|null=null;

  viewResults(): void {
  if (this.selectedCharacteristics.length >= 1) {
    // بناء معلمات الخصائص باستخدام الأسماء
    const selectedCharacteristicNames = this.selectedCharacteristics
      .map(materialValue => {
        const material = this.characteristics.find(material => material === materialValue);
        return material ? material : null;
      })
      .filter(name => name !== null); // تصفية الأسماء غير الموجودة

    // بناء رابط مع تكرار معلمة "materials" لكل خاصية
    const characteristicParams = selectedCharacteristicNames.map(name => `materials=${name}`).join('&');
    console.log("productselected:", this.productselected);

    // تأكد من أن productselected يحتوي على كائنات يمكن الوصول إلى categoryId منها
    if (this.productselected.length > 0) {
      for (let index = 0; index < this.productselected.length; index++) {
        const productId = this.productselected[index].id; // الحصول على معرف المنتج
        this.filter.url = `http://localhost:5250/api/ProductAdmin/${productId}`;

        this.filter.getAll().subscribe({
          next: data => {
            this.test = data; // تعيين القيمة بشكل صحيح

            // Correct access to categoryId
            const categoryId = this.test?.categoryId; // تأكد من أن الحقل صحيح

            if (categoryId !== undefined) {
              this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${characteristicParams}`;
              console.log('URL: ', this.filter.url);

              this.filter.getAll().subscribe({
                next: data => {
                  this.products.push(...data); // استخدم push لإضافة المنتجات
                  this.characteristicsSelected.emit(this.products);
                  console.log("Products with selected characteristics", this.products);
                },
                error: err => {
                  this.characteristicsSelected.emit(this.products);
                  console.log('Error fetching products for selected characteristics:', err);
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
    console.log('No characteristics selected.');
  }
}

  

  clearSelection() {
    this.selectedCharacteristics = [];
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

class Productsearch {
  constructor(public id: number, public productId: number, public productName: string, public sizeId: number, public sizeValue: string,
    public price: number, public stockQuantity: number, public productColor: number, public productMaterial: number, public categoryId: number
  ) {}
}
