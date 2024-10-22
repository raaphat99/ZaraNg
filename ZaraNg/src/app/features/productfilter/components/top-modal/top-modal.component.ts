import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './top-modal.component.html',
  styleUrls: ['./top-modal.component.css']
})
export class TopModalComponent {
  Styles: string[] = [
    'BLAZERS',
    'TROUSERS',
    'JEANS',
    'SKIRTS',
    'OUTERWEAR',
    'CARDIGANS',
    'KNITWEAR',
    'SWEATSHIRTS',
    'SUITS',
  ];
  
  isopen: boolean = false;
  selectedtop: string[] = [];
  
  @Output() topSelected = new EventEmitter<Productsearch[]>();
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
    const index = this.selectedtop.indexOf(style);
    if (index === -1) {
      this.selectedtop.push(style);
    } else {
      this.selectedtop.splice(index, 1);
    }
  }

  // Mapping of styles to product IDs
  private styleProductIdMap: { [key: string]: number } = {
    'BLAZERS': 13,
    'TROUSERS': 18,
    'JEANS': 19,
    'SKIRTS': 20,
    'OUTERWEAR': 21,
    'CARDIGANS': 22,
    'KNITWEAR': 23,
    'SWEATSHIRTS': 24,
    'SUITS': 30,
  };
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
      this.selectedtop.length === 0
    }
  }
  products: Productsearch[]=[];
  viewResults() {

    if (this.selectedtop.length > 0) {
      const categoryId = this.productselected.length > 0 ? this.productselected[0].categoryId : null;

      if (categoryId !== null) {

        this.products=[]; 
        for (let style of this.selectedtop) {
          const productId = this.styleProductIdMap[style]; // Get product ID from the mapping

          if (productId) {
            // Construct the final URL with category ID and each selected style (productId)
            const url = `http://localhost:5250/api/Products/category/${productId}`;
            console.log('Fetching URL:', url);

            this.filter.url = url; // Update filter URL for each request

            // Send the API request for each productId
            this.filter.getAll().subscribe({
              next: data => {
                this.products = data;
                this.topSelected.emit(this.products); // Emit the selected styles
                console.log("Products with selected style", data);
              },
              error: err => {
                this.topSelected.emit(this.products); // Emit the selected styles
                console.log('Error fetching products for selected style:', err);
              }
            });
          }
        }
        this.topSelected.emit(this.products); // Emit the selected styles

      } else {
        console.log('No categoryId found in productselected');
      }
    }
  }


  clearSelection() {
    this.selectedtop = [];
    console.log('Selection cleared'); 
  }

  isStyleSelected(style: string): boolean {
    return this.selectedtop.includes(style);
  }
}

class Productsearch {
  constructor(public id: number, public productId: number, public productName: string, public sizeId: number, public sizeValue: string,
    public price: number, public stockQuantity: number, public productColor: number, public productMaterial: number, public categoryId: number) {}
}
