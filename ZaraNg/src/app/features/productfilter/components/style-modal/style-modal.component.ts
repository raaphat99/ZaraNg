import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-style-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './style-modal.component.html',
  styleUrls: ['./style-modal.component.css'] // التصحيح هنا
})
export class StyleModalComponent {
  
  Styles: string[] = [
    'DRESSES',
    'TOPS',
    'T-SHIRTS',
    'BASIC',
  ];
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
  isopen: boolean = false;
  selectedstyle: string[] = [];
  
  @Output() styleSelected = new EventEmitter<Productsearch[]>();
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

  products: Productsearch[]=[];

  // Mapping of styles to product IDs
private styleProductIdMap: { [key: string]: number } = {
  'DRESSES': 14,
  'TOPS': 15,
  'T-SHIRTS': 16,
  'BASIC': 33,
};

viewResults() {

  if (this.selectedstyle.length > 0) {
    const categoryId = this.productselected.length > 0 ? this.productselected[0].categoryId : null;

    if (categoryId !== null) {
      this.products=[]; 
      for (let style of this.selectedstyle) {
        const productId = this.styleProductIdMap[style]; // احصل على معرف المنتج بناءً على الـ style
        if (productId) {
          const url = `http://localhost:5250/api/Products/category/${productId}`;
          console.log('Fetching URL:', url);

          this.filter.url = url; // تعيين عنوان URL للفلتر

          this.filter.getAll().subscribe({
            next: data => {
              this.products = data;
              this.styleSelected.emit(this.products);
              console.log("Products with selected style", this.products);
            },
            error: err => {
              this.styleSelected.emit(this.products);
              console.log('Error fetching products for selected style:', err);
            }
          });
        }
      }
      this.styleSelected.emit(this.products);
    } else {
      console.log('No categoryId found in productselected');
    }
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
class Productsearch {
  constructor(public id: number, public productId: number, public productName: string, public sizeId: number, public sizeValue: string,
    public price: number, public stockQuantity: number, public productColor: number, public productMaterial: number, public categoryId: number
  ) {}
}