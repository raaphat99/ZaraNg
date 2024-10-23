import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-material-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent {
  materials: string[] = [
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
  selectedMaterial: string[] = [];
  
  @Output() materialSelected = new EventEmitter<Productsearch>();
  @Input() productselected: Productsearch[] = []; 

  constructor(public filter: FilterService) {}

  open(): void {
    this.isopen = true;
  }

  close(): void {
    console.log('Modal closed'); // للتحقق من استدعاء الدالة
    this.isopen = false;
  }

  toggleMaterial(material: string) {
    const index = this.selectedMaterial.indexOf(material);
    if (index === -1) {
      this.selectedMaterial.push(material);
    } else {
      this.selectedMaterial.splice(index, 1);
    }
  }

  products: Productsearch = new Productsearch(0, 0, "", 0, "", 0, 0, 0, 0, 0);

  viewResults() {

    if (this.selectedMaterial.length > 0) {
      const materialParams = this.selectedMaterial.map(material => `materials=${material}`).join('&');

      const categoryId = this.productselected.length > 0 ? this.productselected[0].categoryId : null; // استخدام categoryId من أول منتج كمثال

      if (categoryId !== null) {
        this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&${materialParams}`;
        console.log('Fetching URL:', this.filter.url); // لعرض الرابط في وحدة التحكم

        this.products=new Productsearch(0,0,"",0,"",0,0,0,0,0);

        this.filter.getAll().subscribe({
          next: data => {
            this.products = data; 
            this.materialSelected.emit(this.products);

            console.log("Products with selected materials", this.products);
          },
          error: err => {
            console.error('Error fetching products for selected materials:', err);
          }
        });
        this.materialSelected.emit(this.products);
      } else {
        console.error('No categoryId found in productselected');
      }
    }
    this.close();
  }

  clearSelection() {
    this.selectedMaterial = [];
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
