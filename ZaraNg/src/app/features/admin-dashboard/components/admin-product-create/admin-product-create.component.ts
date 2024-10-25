import { CommonModule } from '@angular/common';
import { Component, numberAttribute } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminProService } from '../../services/admin-pro.service';
import { HttpHeaders } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MainCategory } from './MainCategory';
import { Product } from './Product';

@Component({
  selector: 'app-admin-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './admin-product-create.component.html',
  styleUrl: './admin-product-create.component.css'
})
export class AdminProductCreateComponent {
  addProduct: Product = new Product(0, '', '', '', '', 0, 0, '', '', 0, []);
  category: MainCategory[] = [];  
  showModal: boolean = false; 
  modalMessage: string = ''; 
  showVariantForm: boolean = false; 
  goToList() {
  }
  constructor(public api: AdminProService) {}

  ngOnInit(): void {
    this.api.url = 'http://localhost:5250/api/Category/main-categories';
    this.api.getAll().subscribe({
      next: (data: MainCategory[]) => {
        this.category = data;
        console.log("Filtered Products Variant", this.category);
      },
      error: err => {
        console.log('Error fetching products Variant:', err);
      }
    });

  }
  subcategory = []; // Populate with your subcategories
  Scat:MainCategory[]|null=null;
  SScat:MainCategory[]=[]
  selectedMainCategory: boolean = false; 

  onMainCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Type assertion
    const selectedId = target.value;
    this.SScat=[];
    if (selectedId) {
      this.addProduct.CategoryId = +selectedId; // Set CategoryId to the selected main category
      this.selectedMainCategory = true; // Indicate a main category is selected
    } else {
      this.addProduct.CategoryId = 0; // Reset if no category is selected
      this.selectedMainCategory = false; 
    }

    this.api.url = 'http://localhost:5250/api/Category/' + this.addProduct.CategoryId + '/subcategories';
    this.api.getAll().subscribe({
      next: (data: MainCategory[]) => {
        this.Scat = data; // Populate the subcategories
        console.log("sub cat", this.Scat);
      },
      error: err => {
        console.log('Error fetching subcat:', err);
      }
    });
  }
 
  
  productname:string='';
  
  getCategoryNameById(categoryId: number): string {
    const category = this.category.find(cat => cat.id === categoryId);
    console.log(category ? category.name : 'Category not found for id: ' + categoryId);
    return category ? category.name : '';
  }

  onSubCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Type assertion
    const selectedId = target.value;
    console.log("selectedId"+selectedId);
    this.api.url='http://localhost:5250/api/Category/'+selectedId+'/subcategories';
    this.api.getAll().subscribe({
      next: (data: MainCategory[]) => {
        this.SScat = data; // Populate the subcategories
        console.log("SScat cat", this.SScat);
      },
      error: err => {
        console.log('Error fetching subcat:', err);
      }
    });
  
      if (selectedId) {
      this.addProduct.CategoryId = +selectedId; // Set CategoryId to the selected subcategory
    }
  }

  isCategoryValid(form: NgForm): boolean {
    return this.addProduct.CategoryId > 0; // Valid if CategoryId is set
  }
  productId:number=0;

 onSubmit(productData: any) {
  if (productData.invalid) {
    console.log("Form is invalid. Please check your input.");
    return; // Prevent form submission if validation fails
  }

    // Existing submission logic
    const categoryId = this.addProduct.CategoryId; // Use single CategoryId
    const categoryName = this.getCategoryNameById(categoryId);
    
    const productToSend = {
      id: 0,
      name: this.addProduct.name,
      description: this.addProduct.description,
      price: this.addProduct.price,
      stockQuantity: this.addProduct.stockQuantity,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      categoryId: categoryId,
      categoryName: categoryName,
      mainImageUrl: "",
      filterName: ["string"]
    };

    console.log('Sending product data:', productToSend);
    this.api.url = 'http://localhost:5250/api/ProductAdmin';

    this.api.add(productToSend)
      .subscribe({
          next: (response) => {
            this.productId = response.id; // احصل على الـ id الخاص بالمنتج الجديد من الـ response
            this.productname=response.name;
              console.log('Product created successfully! ', response+"",this.productId);
              this.modalMessage = "Product added successfully!";
              this.showModal = true; // Show modal with message
          },
          error: (error) => {
              if (error.status === 409) { // Handle conflict error
                  this.modalMessage = "Product with the same name and category already exists.";
              } else {
                  this.modalMessage = "Error creating product. Please try again.";
              }
              this.showModal = true; // Show modal with appropriate message
              console.log('Error creating product:', error);
          }
      });
  }

  closeModal() {
    this.showModal = false; // لإخفاء المودال عند الضغط على الإغلاق
  }
}

