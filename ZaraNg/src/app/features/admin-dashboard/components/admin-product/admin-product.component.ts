import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ApiService } from '../../../../core/services/api.service';
import { AdminProService } from '../../services/admin-pro.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from './Product';
import { productV } from './productV';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent {
  allproduct: Product[] = [];
  selectedProduct: Product | null = null;
  displayProductDialog: boolean = false;
  productid: number | null = null;
  productvariant: productV[] | null = null;

  constructor(public api: AdminProService,private router: Router) {}

  ngOnInit(): void {
    this.api.url = ' http://localhost:5250/api/ProductAdmin';
    this.api.getAll().subscribe({
      next: (data: Product[]) => {  
        this.allproduct = data.filter((product: Product) => product.categoryName !== 'VIEW ALL'); 
        console.log("Filtered Products", this.allproduct);
      },
      error: err => {
        console.log('Error fetching products:', err);
      }
    });
  }
  showVariant(product: any) {
    this.router.navigate(['/products/productvariant/', product.id]);
}
viewproduct(p: Product) {
  this.displayProductDialog = true;
  this.selectedProduct = p;  
  this.productid = this.selectedProduct?.id;  
  
  console.log("Selected Product ID:", this.productid); // Log ID
  console.log("Selected Product Category ID:", this.selectedProduct?.CategoryId); // Check Category ID

  this.api.url = `http://localhost:5250/api/ProductAdmin/${this.productid}/variants`;

  this.api.getAll().subscribe({
    next: (data: productV[]) => {  
        this.productvariant = data.map(variant => {
            // التحقق من categoryId 
            if ([62, 63, 64, 65].includes(variant.categoryId)) {
                variant.productMaterial = '';
                variant.productColor = '';
                variant.sizeName = '';
            }
            return variant;
        });
        console.log("Filtered Products Variant", this.productvariant); // Log product variants
    },
    error: err => {
        console.log('Error fetching products Variant:', err);
    }
});

}

  // viewproduct(p: Product) {
  //   this.displayProductDialog = true;
  //   this.selectedProduct = p;  
  //   this.productid = this.selectedProduct?.id;  
    
  //   console.log("Selected Product ID:", this.selectedProduct?.id);
  //   console.log("Selected Product Category ID:", this.selectedProduct?.CategoryId); // Log the CategoryId

  //   this.api.url = ` http://localhost:5250/api/ProductAdmin/${this.productid}/variants`;
  

  //   this.api.getAll().subscribe({
  //     next: (data: productV[]) => {  
  //       this.productvariant = data; 
  //       console.log("Filtered Products Variant", this.productvariant);
  //     },
  //     error: err => {
  //       console.log('Error fetching products Variant:', err);
  //     }
  //   });
  // }
  isExcludedCategory(categoryId: number): boolean {
    return [62, 63, 64, 65].includes(categoryId);
  }
  

  get productColors(): string {
    return Array.from(new Set(this.productvariant?.map(item => item.productColor))).join(', ') || '';
  }

  get productSizes(): string {
    return Array.from(new Set(this.productvariant?.map(item => item.sizeName))).join(', ') || '';
  }

  get productMaterials(): string {
    return Array.from(new Set(this.productvariant?.map(item => item.productMaterial))).join(', ') || '';
  }

  confirmDelete(pro: Product) {
    const confirmation = window.confirm(`Are you sure you want to delete the product: ${pro.name}?`);

    if (confirmation) {
        this.deleteProduct(pro.id); 
    } else {
       console.log("Delete action was cancelled.");
    }
}

deleteProduct(productId: number) {
    console.log(`Product with ID ${productId} deleted.`);
    this.api.url='http://localhost:5250/api/Products/deactivate/'+productId;
    this.api.deactivateProduct(productId).subscribe({
      next: (response) => {  
          console.log(`Product with ID ${productId} stock quantity set to zero successfully.`);
          // يمكنك هنا تحديث قائمة المنتجات أو القيام بأي إجراء آخر بعد تعطيل المنتج
      },
      error: (err) => {
          console.log('Error deactivating product:', err);
      }
  });

}

}
