import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminProService } from '../../services/admin-pro.service';
import { productV } from '../admin-product/productV';
import { Product } from '../admin-product/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainCategory } from '../admin-product-create/MainCategory';

@Component({
  selector: 'app-admin-product-update',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './admin-product-update.component.html',
  styleUrl: './admin-product-update.component.css'
})
 export class AdminProductUpdateComponent {
  productId: number | null = null;
  showErrorPopup = false; // To control the display of the error popup
  category: MainCategory[] = [];
  pv: productV[] = []; // تهيئة pv كصفيف فارغ
  product: Product | null = null;
  showModal: boolean = false;
  modalMessage: string = '';
  Scat: MainCategory[] | null = null;
  selectedMainCategory: boolean = false;

  constructor(private route: ActivatedRoute, public api: AdminProService) {}
  ngOnInit() {
    // استلام id المنتج من المسار
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.fetchProductData(this.productId);
      }
    });
  
    // جلب الفئات الرئيسية
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
  closeErrorPopup() {
    this.showErrorPopup = false;
  }

  fetchProductData(productId: number) {
    this.api.url = 'http://localhost:5250/api/ProductAdmin/' + productId;
    this.api.getAll().subscribe({
      next: (data: Product) => {
        this.product = data;
        console.log('Product data:', this.product);
      },
      error: err => {
        console.log('Error fetching product:', err);
      }
    });
  }

  onSubmit(productForm: any) {

    if (productForm.invalid) {
      this.showErrorPopup = true;
      console.log("Form is invalid. Please check your input.");
      return;
    }

    const categoryId = this.product!.CategoryId; // Use single CategoryId
    const categoryName = this.getCategoryNameById(categoryId);

    const productToSend = {
      id: this.productId, // استخدام الـ id الحالي للتعديل
      name: this.product!.name,
      description: this.product!.description,
      price: this.product!.price,
      stockQuantity: this.product!.stockQuantity,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      categoryId: categoryId,
      categoryName: categoryName,
      mainImageUrl: "",
      filterName: ["string"]
    };

    this.api.url = 'http://localhost:5250/api/ProductAdmin';

    this.api.editproduct(productToSend, this.productId!)
      .subscribe({
        next: (response) => {
          console.log('Product updated successfully!', response);
          this.modalMessage = "Product updated successfully!";
          this.showModal = true; // Show modal with message
        },
        error: (error) => {
          if (error.status === 409) {
            this.modalMessage = "Product with the same name and category already exists.";
          } else {
            this.modalMessage = "Error updating product. Please try again.";
          }
          this.showModal = true; // Show modal with appropriate message
        }
      });
  
  }

  closeModal() {
    this.showModal = false;
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.category.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }

  onMainCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value;

    if (selectedId) {
      this.product!.CategoryId = +selectedId;
      this.selectedMainCategory = true;
      this.fetchSubcategories(this.product!.CategoryId);
    } else {
      this.product!.CategoryId = 0;
      this.selectedMainCategory = false;
    }
    
  }

  onSubCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value;

    if (selectedId) {
      this.product!.CategoryId = +selectedId;
    }
  }

  fetchSubcategories(mainCategoryId: number) {
    this.api.url = 'http://localhost:5250/api/Category/' + mainCategoryId + '/subcategories';
    this.api.getAll().subscribe({
      next: (data: MainCategory[]) => {
        this.Scat = data;
        
      },
      error: err => {
        console.log('Error fetching subcategories:', err);
      }
    });
  }
}
