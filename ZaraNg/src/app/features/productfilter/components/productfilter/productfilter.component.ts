import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { productV } from '../../../admin-dashboard/components/admin-product/productV';
import { ProductModule } from '../../../product/product.module';
import { Product } from '../../../admin-dashboard/components/admin-product/Product';

@Component({
  selector: 'app-productfilter',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule,ColorModalComponent,PriceModalComponent,ShoesizeModalComponent,CharacteristicsModalComponent,SizeModalComponent,StyleModalComponent,TopModalComponent,
    ProductModule
  ],
  templateUrl: './productfilter.component.html',
  styleUrls: ['./productfilter.component.css']
})
export class ProductfilterComponent {
  filterforman: string[] = [];
  filterforwoman: string[] = [];
  products: any[] = [];
  selectedButton: string = "VIEW ALL"; // Default selected button

  constructor(private router: Router, private route: ActivatedRoute,public filter:FilterService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['products']) {
        this.products = JSON.parse(params['products']);
        console.log("Received Products from query params: ", this.products);
        this.pro=this.products;
        this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات

      }
    });
  
    // for (let index = 0; index < this.products.length; index++) {
    //     if(this.products[index].categoryId==12||this.products[index].categoryId==35){
    //       this.filter.url='http://localhost:5250/api/Products/subcategory/'+this.products[0].categoryId;
    //       this.filter.getAll().subscribe({
    //         next: data => {
    //           this.pro = data; 
    //           this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات
    //           console.log("Products with selected pro", this.pro);
    //         },
    //         error: err => {
    //           console.log('Error fetching products for selected :', err);
    //         }
    //       });
    //     }else{
    //       this.filter.url='http://localhost:5250/api/Products/category/'+this.products[0].categoryId;
    //       this.filter.getAll().subscribe({
    //         next: data => {
    //           this.pro = data; 
    //           this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات
    //           console.log("Products with selected pro", this.pro);
    //         },
    //         error: err => {
    //           console.log('Error fetching products for selected :', err);
    //         }
    //       });
    //     }  
    // }
    

  }

  @ViewChild('colorModal') colorModal!: ColorModalComponent;
  @ViewChild('characteristicModal') characteristicModal!: CharacteristicsModalComponent;
  @ViewChild('styleModal') styleModal!: StyleModalComponent;
  @ViewChild('topModal') topModal!: TopModalComponent;
  @ViewChild('sizeModal') sizeModal!: SizeModalComponent;
  @ViewChild('shsizeModal') shsizeModal!: ShoesizeModalComponent;
  @ViewChild('priceModal') priceModal!: PriceModalComponent;

  selectedItem: string | null = null;

  product2:Productsearch[]=[];
  product3:Productsearch[]=[];
  openModal(item: string): void {
    this.selectedButton = item; // Update the selected button
  this.selectedButton = item; // Update the selected button
  if(item==='VIEW ALL'){

    console.log("pro"+this.pro);
    // for (let index = 0; index < this.products.length; index++) {
    //   if(this.products[index].categoryId==12||this.products[index].categoryId==35){
    //     this.filter.url='http://localhost:5250/api/Products/subcategory/'+this.products[0].categoryId;
    //     this.filter.getAll().subscribe({
    //       next: data => {
    //         this.pro = data; 
    //         this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات
    //         console.log("Products with selected pro", this.pro);
    //       },
    //       error: err => {
    //         console.log('Error fetching products for selected :', err);
    //       }
    //     });
    //   }
    for(let index = 0; index < this.products.length; index++){
        this.filter.url='http://localhost:5250/api/Products/category/'+this.products[0].categoryId;
        this.filter.getAll().subscribe({
          next: data => {
            this.pro = data; 
            this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات
            console.log("Products with selected pro", this.pro);
          },
          error: err => {
            console.log('Error fetching products for selected :', err);
          }
        });
      }  
  
    this.pro;
    this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات

  }
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
        const categoryId = this.products[0].categoryId;
    
        if (categoryId !== null) {
          this.filter.url = `http://localhost:5250/api/Products/filter?categoryId=${categoryId}&materials=DENIM`;
          console.log('Fetching URL:', this.filter.url); // Log the URL in the console
    
          // Send the request to the API
          this.pro=[];
          this.filter.getAll().subscribe({
            next: (data: any) => {
              this.product2 = data;
              console.log("Products with selected:", this.product2);
              
              this.pro = []; // Clear previous values
              
              this.product2.forEach((prod) => {
                this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.productId;
    
                this.filter.getAll().subscribe({
                  next: (data: any) => {
                    let transformedProducts = [];
    
                    if (Array.isArray(data)) {
                      // Transform array of products
                      transformedProducts = data.map(p => ({
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        stockQuantity: p.stockQuantity,
                        sizeType: p.sizeType,
                        mainImageUrl: p.mainImageUrl,
                        created: new Date(p.created),
                        updated: new Date(p.updated)
                      }));
                    } else {
                      // Transform single product
                      transformedProducts = [{
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        stockQuantity: data.stockQuantity,
                        sizeType: data.sizeType,
                        mainImageUrl: data.mainImageUrl,
                        created: new Date(data.created),
                        updated: new Date(data.updated)
                      }];
                    }
    
                    // Check for duplicates and add to pro list
                    transformedProducts.forEach(product => {
                      const exists = this.pro.some(p => p.id === product.id);
                      if (!exists) {
                        this.pro.push(product);  // Add only if not already present
                        this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات

                      }
                    });
    
                    console.log("Combined Products for Denim:", this.pro);
                  },
                  error: err => {
                    console.error('Error fetching products:', err);
                  }
                });
              });
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
        this.pro=[];

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
    
                // Now fetch details for each product in product3
                this.product3.forEach((prod) => {
                  this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.id;
    
                  this.filter.getAll().subscribe({
                    next: (data: any) => {
                      let transformedProducts = [];
    
                      if (Array.isArray(data)) {
                        // Transform array of products
                        transformedProducts = data.map(p => ({
                          id: p.id,
                          name: p.name,
                          description: p.description,
                          price: p.price,
                          stockQuantity: p.stockQuantity,
                          sizeType: p.sizeType,
                          mainImageUrl: p.mainImageUrl,
                          created: new Date(p.created),
                          updated: new Date(p.updated)
                        }));
                      } else {
                        // Transform single product
                        transformedProducts = [{
                          id: data.id,
                          name: data.name,
                          description: data.description,
                          price: data.price,
                          stockQuantity: data.stockQuantity,
                          sizeType: data.sizeType,
                          mainImageUrl: data.mainImageUrl,
                          created: new Date(data.created),
                          updated: new Date(data.updated)
                        }];
                      }
    
                      // Check for duplicates and add to pro list
                      transformedProducts.forEach(product => {
                        const exists = this.pro.some(p => p.id === product.id);
                        if (!exists) {
                          this.pro.push(product);  // Add only if not already present
                          this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات

                        }
                      });
    
                      console.log("Combined Products for JACKETS | COATS:", this.pro);
                    },
                    error: err => {
                      console.error('Error fetching products:', err);
                    }
                  });
                });
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
      this.pro=[];
      this.fetchProductsForCategory(53, "SHOES | BAGS");
    }
    
    if (item === 'ACCESSORIES | PERFUMES') {
      this.pro=[];
      this.fetchProductsForCategory(44, "ACCESSORIES")
        .then(() => this.fetchProductsForCategory(55, "PERFUMES"));
    }
    
    // Function to fetch products for a given category
  }
  private fetchProductsForCategory(categoryId: number, categoryName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.products.length > 0) {
        // Fetch products for the specified category
        this.filter.url = `http://localhost:5250/api/Products/category/${categoryId}`;
        console.log(`Fetching URL for ${categoryName}:`, this.filter.url);
  
        this.filter.getAll().subscribe({
          next: (data: Product2[]) => {
            if (categoryName === "SHOES | BAGS") {
              this.pro = data; 
            } else {
              this.pro = this.pro.concat(data); // Concatenate results
              this.cdr.detectChanges();  // أخبر Angular أن هناك تغييرات
            }
            console.log(`Products for ${categoryName}:`, this.pro);
            resolve(); // Resolve the promise
          },
          error: err => {
            console.error(`Error fetching products for ${categoryName}:`, err);
            reject(err); // Reject the promise
          }
        });
      } else {
        resolve(); // Resolve if there are no products
      }
    });
  }

  productvc: Productsearch[] = [];
  pro: Product2[] = [];

  // handleColorSelection(color: Productsearch[]): void {
  //   // Reset productvc to null before assigning the new color
  //   this.productvc = [];  // Clear previous value
  //   this.productvc = color;  // Assign the new value
  //   console.log("color product v ", color);
    
  //   this.pro = []; // Clear the previous products
    
  //   this.productvc.forEach((prod) => {
  //     this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.productId;
  
  //     this.filter.getAll().subscribe({
  //       next: (data: any) => {
  //         let transformedProducts = [];
  
  //         if (Array.isArray(data)) {
  //           transformedProducts = data.map(p => ({
  //             id: p.id,
  //             name: p.name,
  //             description: p.description,
  //             price: p.price,
  //             stockQuantity: p.stockQuantity,
  //             sizeType: p.sizeType,
  //             mainImageUrl: p.mainImageUrl,
  //             created: new Date(p.created),
  //             updated: new Date(p.updated)
  //           }));
  //         } else {
  //           transformedProducts = [{
  //             id: data.id,
  //             name: data.name,
  //             description: data.description,
  //             price: data.price,
  //             stockQuantity: data.stockQuantity,
  //             sizeType: data.sizeType,
  //             mainImageUrl: data.mainImageUrl,
  //             created: new Date(data.created),
  //             updated: new Date(data.updated)
  //           }];
  //         }
  
  //         // Check for duplicates before adding
  //         transformedProducts.forEach(transProd => {
  //           const exists = this.pro.some(p => p.id === transProd.id);
  //           if (!exists) {
  //             this.pro.push(transProd);
  //           }
  //         });
  
  //         console.log("Combined Products for color:", this.pro);
  //       },
  //       error: err => {
  //         console.error('Error fetching products:', err);
  //       }
  //     });
  //   });
  // }
  handleColorSelection(color: Productsearch[]): void {
    this.productvc = []; // Clear previous value
    this.productvc = color; // Assign the new value
    console.log("color product v ", color);
    
    this.pro = []; // Clear the previous products

    // Call the filter service and pass the selected color
    this.filter.filterProductsByVariant(color).subscribe(
      (filteredProducts: Product2[]) => {
        this.pro = filteredProducts; // Assign the filtered products
        console.log("Filtered products: ", this.pro);
      },
      error => {
        console.error('Error fetching filtered products', error);
      }
    );
  }
  product:Productsearch[]=[]
  handleCharacteristicsSelection(selectedCharacteristics: Productsearch[]): void {
    console.log('Selected products for selectedCharacteristics:', selectedCharacteristics);
    this.product = selectedCharacteristics;
    this.pro = [];
    this.product.forEach((prod) => {
      this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.id;
  
      this.filter.getAll().subscribe({
        next: (data: any) => {
          let transformedProducts = [];
  
          if (Array.isArray(data)) {
            transformedProducts = data.map(p => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stockQuantity: p.stockQuantity,
              sizeType: p.sizeType,
              mainImageUrl: p.mainImageUrl,
              created: new Date(p.created),
              updated: new Date(p.updated)
            }));
          } else {
            transformedProducts = [{
              id: data.id,
              name: data.name,
              description: data.description,
              price: data.price,
              stockQuantity: data.stockQuantity,
              sizeType: data.sizeType,
              mainImageUrl: data.mainImageUrl,
              created: new Date(data.created),
              updated: new Date(data.updated)
            }];
          }
  
          // Check for duplicates before adding
          transformedProducts.forEach(transProd => {
            const exists = this.pro.some(p => p.id === transProd.id);
            if (!exists) {
              this.pro.push(transProd);
            }
          });
  
          console.log("Combined Products for Material:", this.pro);
        },
        error: err => {
          console.error('Error fetching products:', err);
        }
      });
    });
  }
  handleStyleSelection(selectedstyle: Productsearch[]): void {
    this.productvc = [];  // Clear previous value
    this.productvc = selectedstyle;  // Assign the new value
    console.log('Selected Style:', selectedstyle);
    
    this.pro = []; // Clear the previous products
    
    this.productvc.forEach((prod) => {
      this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.id;
  
      this.filter.getAll().subscribe({
        next: (data: any) => {
          let transformedProducts = [];
  
          if (Array.isArray(data)) {
            transformedProducts = data.map(p => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stockQuantity: p.stockQuantity,
              sizeType: p.sizeType,
              mainImageUrl: p.mainImageUrl,
              created: new Date(p.created),
              updated: new Date(p.updated)
            }));
          } else {
            transformedProducts = [{
              id: data.id,
              name: data.name,
              description: data.description,
              price: data.price,
              stockQuantity: data.stockQuantity,
              sizeType: data.sizeType,
              mainImageUrl: data.mainImageUrl,
              created: new Date(data.created),
              updated: new Date(data.updated)
            }];
          }
  
          // Check for duplicates before adding
          transformedProducts.forEach(transProd => {
            const exists = this.pro.some(p => p.id === transProd.id);
            if (!exists) {
              this.pro.push(transProd);
            }
          });
  
          console.log("Combined Products for style:", this.pro);
        },
        error: err => {
          console.error('Error fetching products:', err);
        }
      });
    });
  }
  handletopSelection(selectedtop: Productsearch[]): void {
    this.productvc = [];  // Clear previous value
    this.productvc = selectedtop;  // Assign the new value
    console.log('Selected type of product:', selectedtop);
    
    this.pro = []; // Clear the previous products
    
    this.productvc.forEach((prod) => {
      this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.id;
  
      this.filter.getAll().subscribe({
        next: (data: any) => {
          let transformedProducts = [];
  
          if (Array.isArray(data)) {
            transformedProducts = data.map(p => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stockQuantity: p.stockQuantity,
              sizeType: p.sizeType,
              mainImageUrl: p.mainImageUrl,
              created: new Date(p.created),
              updated: new Date(p.updated)
            }));
          } else {
            transformedProducts = [{
              id: data.id,
              name: data.name,
              description: data.description,
              price: data.price,
              stockQuantity: data.stockQuantity,
              sizeType: data.sizeType,
              mainImageUrl: data.mainImageUrl,
              created: new Date(data.created),
              updated: new Date(data.updated)
            }];
          }
  
          // Check for duplicates before adding
          transformedProducts.forEach(transProd => {
            const exists = this.pro.some(p => p.id === transProd.id);
            if (!exists) {
              this.pro.push(transProd);
            }
          });
  
          console.log("Combined Products for Type of product:", this.pro);
        },
        error: err => {
          console.error('Error fetching products:', err);
        }
      });
    });
  }
  handlesizeSelection(selectedsize: Productsearch[]): void {
    this.productvc = [];  // Clear previous value
    this.productvc = selectedsize;  // Assign the new value
    console.log('Selected size for cloth:', selectedsize);
    this.pro = [];  // Clear pro array
  
    this.productvc.forEach((prod) => {
      this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.productId;
  
      this.filter.getAll().subscribe({
        next: (data: any) => {
          console.log("size:", data);
          
          let transformedProducts = [];
  
          if (Array.isArray(data)) {
            // Transform array of products
            transformedProducts = data.map(p => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stockQuantity: p.stockQuantity,
              sizeType: p.sizeType,
              mainImageUrl: p.mainImageUrl,
              created: new Date(p.created),
              updated: new Date(p.updated)
            }));
          } else {
            // Transform single product
            transformedProducts = [{
              id: data.id,
              name: data.name,
              description: data.description,
              price: data.price,
              stockQuantity: data.stockQuantity,
              sizeType: data.sizeType,
              mainImageUrl: data.mainImageUrl,
              created: new Date(data.created),
              updated: new Date(data.updated)
            }];
          }
  
          // Check if the product is already in pro list before adding
          transformedProducts.forEach(product => {
            const exists = this.pro.some(p => p.id === product.id);
            if (!exists) {
              this.pro.push(product);  // Add only if not already present
            }
          });
  
          console.log("Combined Products for Size:", this.pro);
        },
        error: err => {
          console.error('Error fetching products:', err);
        }
      });
    });
  }
  handleshsizeSelection(selectedshsize: Productsearch[]): void {
    this.productvc = [];  // Clear previous value
    this.productvc = selectedshsize;  // Assign the new value
    console.log('Selected size for shoes:', selectedshsize);
    this.pro = [];  // Clear pro array
  
    this.productvc.forEach((prod) => {
      this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.productId;
  
      this.filter.getAll().subscribe({
        next: (data: any) => {
          let transformedProducts = [];
  
          if (Array.isArray(data)) {
            // Transform array of products
            transformedProducts = data.map(p => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stockQuantity: p.stockQuantity,
              sizeType: p.sizeType,
              mainImageUrl: p.mainImageUrl,
              created: new Date(p.created),
              updated: new Date(p.updated)
            }));
          } else {
            // Transform single product
            transformedProducts = [{
              id: data.id,
              name: data.name,
              description: data.description,
              price: data.price,
              stockQuantity: data.stockQuantity,
              sizeType: data.sizeType,
              mainImageUrl: data.mainImageUrl,
              created: new Date(data.created),
              updated: new Date(data.updated)
            }];
          }
  
          // Check if the product is already in pro list before adding
          transformedProducts.forEach(product => {
            const exists = this.pro.some(p => p.id === product.id);
            if (!exists) {
              this.pro.push(product);  // Add only if not already present
            }
          });
  
          console.log("Combined Products for SHOES:", this.pro);
        },
        error: err => {
          console.error('Error fetching products:', err);
        }
      });
    });
  }
  handleshpriceSelection(selectedshprice: Productsearch[]): void {
    this.productvc = [];  // Clear previous value
    this.productvc = selectedshprice;  // Assign the new value
    console.log('Selected Price:', selectedshprice);
  
    // Check if productvc has data, otherwise clear this.pro and return
    if (!this.productvc || this.productvc.length === 0) {
      this.pro = [];
      console.log('No products found for the selected price range.');
      return;  // Exit the function early
    }
  
    this.pro = [];  // Clear pro array
  
    this.productvc.forEach((prod) => {
      this.filter.url = 'http://localhost:5250/api/ProductAdmin/' + prod.productId;
  
      this.filter.getAll().subscribe({
        next: (data: any) => {
          let transformedProducts: Product2[] = [];  // Explicitly typed as Product[]
  
          if (Array.isArray(data)) {
            // Transform array of products
            transformedProducts = data.map((p: any) => ({
              id: p.id,
              name: p.name,
              description: p.description,
              price: p.price,
              stockQuantity: p.stockQuantity,
              sizeType: p.sizeType,
              mainImageUrl: p.mainImageUrl,
              created: new Date(p.created),
              updated: new Date(p.updated)
            }));
          } else if (data) {
            // Transform single product
            transformedProducts = [{
              id: data.id,
              name: data.name,
              description: data.description,
              price: data.price,
              stockQuantity: data.stockQuantity,
              sizeType: data.sizeType,
              mainImageUrl: data.mainImageUrl,
              created: new Date(data.created),
              updated: new Date(data.updated)
            }];
          }
  
          // Check if the product is already in pro list before adding
          transformedProducts.forEach(product => {
            const exists = this.pro.some(p => p.id === product.id);
            if (!exists) {
              this.pro.push(product);  // Add only if not already present
            }
          });
  
          console.log("Combined Products for Price:", this.pro);
        },
        error: err => {
          console.error('Error fetching products for selected price range:', err);
        }
      });
    });
  }
  
  
}
class Productsearch{
  constructor(public id:number,
    public productId:number,
    public productName:string ,
    public sizeId:number,
    public sizeValue:string,
    public price:number,
    public stockQuantity:number,
    public productColor:number,
    public productMaterial:number,
    public categoryId:number
  ){}
}

export interface Product2 {
  id: number
  name: string,
  description: string,
  price: number,
  stockQuantity: number,
  mainImageUrl?: string,
  created?: Date,
  updated?: Date,
  sizeType: string
}