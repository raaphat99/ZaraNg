import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorModalComponent } from '../color-modal/color-modal.component';
import { CharacteristicsModalComponent } from '../characteristics-modal/characteristics-modal.component';
import { StyleModalComponent } from '../style-modal/style-modal.component';
import { TopModalComponent } from '../top-modal/top-modal.component';
import { SizeModalComponent } from '../size-modal/size-modal.component';
import { ShoesizeModalComponent } from '../shoesize-modal/shoesize-modal.component';
import { PriceModalComponent } from '../price-modal/price-modal.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-productfilter',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule,ColorModalComponent,PriceModalComponent,ShoesizeModalComponent,CharacteristicsModalComponent,SizeModalComponent,StyleModalComponent,TopModalComponent],
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.css']
})
export class ProductfilterComponent {
  filterforman: string[] = [];
  filterforwoman: string[] = [];
  products: any[] = [];
  selectedButton: string = "VIEW ALL"; // Default selected button

  constructor(private router: Router, private route: ActivatedRoute,public filter:FilterService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['products']) {
        this.products = JSON.parse(params['products']);
        console.log("Received Products from query params: ", this.products);
      }
    });
  }

  @ViewChild('colorModal') colorModal!: ColorModalComponent;
  @ViewChild('characteristicModal') characteristicModal!: CharacteristicsModalComponent;
  @ViewChild('styleModal') styleModal!: StyleModalComponent;
  @ViewChild('topModal') topModal!: TopModalComponent;
  @ViewChild('sizeModal') sizeModal!: SizeModalComponent;
  @ViewChild('shsizeModal') shsizeModal!: ShoesizeModalComponent;
  @ViewChild('priceModal') priceModal!: PriceModalComponent;

  selectedItem: string | null = null;

  product2:Productsearch=new Productsearch(0,0,"",0,"",0,0,0,0,0);
  product3:Productsearch[]=[];
  openModal(item: string): void {
    this.selectedButton = item; // Update the selected button
  this.selectedButton = item; // Update the selected button
    if (item === 'COLOUR') {
      this.colorModal.open();
    }
    if (item === 'MATERIALS') {
      this.characteristicModal.open();
    }
    if (item === 'STYLE') {
      this.styleModal.open();
    }
    if (item === 'TYPE OF PRODUCT') {
      this.topModal.open();
    }
    if (item === 'SIZE') {
      this.sizeModal.open();
    }
    if (item === 'SHOE SIZES') {
      this.shsizeModal.open();
    }
    if (item === 'PRICE') {
      this.priceModal.open();
    }
    if (item === 'DENIM') {
      if (this.products.length > 0) {
        const categoryId = this.products.length > 0 ? this.products[0].categoryId : null; // Using categoryId from the first product as an example
    
        if (categoryId !== null) {
          this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&materials=DENIM`;
    
          console.log('Fetching URL:', this.filter.url); // Log the URL in the console
    
          // Send the request to the API
          this.filter.getAll().subscribe({
            next: data => {
              this.product2 = data; 
              console.log("Products with selected:", this.product2);
            },
            error: err => {
              console.error('Error fetching products for selected:', err);
            }
          });
        } else {
          console.error('No categoryId found in productselected');
        }
      }
    }
    
    if (item === 'JACKETS | COATS') {
      if (this.products.length > 0) {
        // Fetch products for category 38 (JACKETS)
        this.filter.url = `http://localhost:5250/api/Products/category/38`;
        console.log('Fetching URL for JACKETS:', this.filter.url);
    
        this.filter.getAll().subscribe({
          next: data => {
            // Initialize product3 with the data from the first request
            this.product3 = data; 
            console.log("Products from JACKETS:", this.product3);
    
            // Now fetch products for category 39 (COATS)
            this.filter.url = `http://localhost:5250/api/Products/category/39`;
            console.log('Fetching URL for COATS:', this.filter.url);
    
            this.filter.getAll().subscribe({
              next: data => {
                // Use concat to combine both results
                this.product3 = this.product3.concat(data); // Concatenate results
                console.log("Combined Products for JACKETS | COATS:", this.product3);
              },
              error: err => {
                console.error('Error fetching products for COATS:', err);
              }
            });
          },
          error: err => {
            console.error('Error fetching products for JACKETS:', err);
          }
        });
      }
    }
   
    if (item === 'SHOES | BAGS') {
      if (this.products.length > 0) {
        // Fetch products for category 53 (SHOES | BAGS)
        this.filter.url = `http://localhost:5250/api/Products/category/53`;
        console.log('Fetching URL for SHOES | BAGS:', this.filter.url);
    
        this.filter.getAll().subscribe({
          next: data => {
            // Initialize product3 with the data from the request
            this.product3 = data; 
            console.log("Products for SHOES | BAGS:", this.product3);
          },
          error: err => {
            console.error('Error fetching products for SHOES | BAGS:', err);
          }
        });
      }
    }
    if (item === 'ACCESSORIES | PERFUMES') {
      if (this.products.length > 0) {
        // Fetch products for category 44 (ACCESSORIES)
        this.filter.url = `http://localhost:5250/api/Products/category/44`;
        console.log('Fetching URL for ACCESSORIES:', this.filter.url);
    
        this.filter.getAll().subscribe({
          next: (data: Productsearch[]) => {
            // Initialize product3 with the data from the first request
            this.product3 = data; 
            console.log("Products from ACCESSORIES:", this.product3);
    
            // Now fetch products for category 55 (PERFUMES)
            this.filter.url = `http://localhost:5250/api/Products/category/55`;
            console.log('Fetching URL for PERFUMES:', this.filter.url);
    
            this.filter.getAll().subscribe({
              next: (data: Productsearch[]) => {
                // Use concat to combine both results
                this.product3 = this.product3.concat(data); // Concatenate results
                console.log("Combined Products for ACCESSORIES | PERFUMES:", this.product3);
              },
              error: err => {
                console.error('Error fetching products for PERFUMES:', err);
              }
            });
    
          },
          error: err => {
            console.error('Error fetching products for ACCESSORIES:', err);
          }
        });
      }
    }
  }
    
  productvc: Productsearch | null = null;

  handleColorSelection(color: Productsearch): void {
    // Reset productvc to null before assigning the new color
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = color;  // Assign the new value
    console.log("color product v ", color);
  }
  
  

  handleCharacteristicsSelection(selectedCharacteristics: Productsearch): void {
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = selectedCharacteristics;  // Assign the new value
    console.log('Selected characteristics:', selectedCharacteristics);
  }

  handleStyleSelection(selectedstyle: Productsearch): void {
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = selectedstyle;  // Assign the new value
    console.log('Selected Style:', selectedstyle);
  }

  handletopSelection(selectedtop: Productsearch): void {
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = selectedtop;  // Assign the new value
    console.log('Selected type of product:', selectedtop);
  }
  handlesizeSelection(selectedsize: Productsearch): void {
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = selectedsize;  // Assign the new value
    console.log('Selected size:', selectedsize);
  }
  handleshsizeSelection(selectedshsize: Productsearch): void {
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = selectedshsize;  // Assign the new value
    console.log('Selected size:', selectedshsize);
  }
  handleshpriceSelection(selectedshprice: Productsearch): void {
    this.productvc = new Productsearch(0,0,"",0,"",0,0,0,0,0);  // Clear previous value
    this.productvc = selectedshprice;  // Assign the new value
    console.log('Selected size:', selectedshprice);
  }
}
class Productsearch{
  constructor(public id:number,public productId:number,public productName:string ,public sizeId:number,public sizeValue:string,
    public price:number,public stockQuantity:number,public productColor:number,public productMaterial:number,public categoryId:number
  ){}
}
