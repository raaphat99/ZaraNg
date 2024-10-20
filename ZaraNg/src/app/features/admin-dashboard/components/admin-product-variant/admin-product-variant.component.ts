import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, numberAttribute, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminProService } from '../../services/admin-pro.service';
import { image } from './image';
import { MainCategory } from './MainCategory';
import { ProductV } from './ProductV';
import { Product } from './Product';
import { PSize } from './PSize';

@Component({
  selector: 'app-admin-product-variant',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './admin-product-variant.component.html',
  styleUrl: './admin-product-variant.component.css'
})
export class AdminProductVariantComponent implements OnInit {
    productId: number | null = null;
    pv: ProductV[] = []; // تهيئة pv كصفيف فارغ
    product: Product | null = null;
    showAddForm = false;
    showEditForm = false;
    showImageForm = false;
    
    constructor(private route: ActivatedRoute, public api: AdminProService, private cdr: ChangeDetectorRef) {}
  catid:number=0;
    ngOnInit() {
      // Get the ID from route parameters
      this.route.paramMap.subscribe(params => {
        this.productId = Number(params.get('id'));
        console.log('Product ID:', this.productId);
  
        // Ensure productId is not null before fetching data
        if (this.productId) {
          // Fetch product data
          this.api.url = 'http://localhost:5250/api/ProductAdmin/' + this.productId;
          this.api.getAll().subscribe({
            next: (data: Product) => {
              this.product = data;
              console.log("Filtered Products for this product", this.product);
              console.log(this.product)
            },
            error: err => {
              console.log('Error fetching product:', err);
            }
          });
    
          console.log(this.catid+"catid");
          // Fetch product variants
          this.api.url = 'http://localhost:5250/api/ProductAdmin/' + this.productId + '/variants';
          this.api.getAll().subscribe({
            next: (data: ProductV[]) => {
              this.pv = data;
              console.log("Filtered Products Variant for this product", this.pv);
            },
            error: err => {
              console.log('Error fetching variants:', err);
            }
          });
        }
      });
    }
    displayProductDialog:boolean=false;

    vimage:image[]|null=[];

    productVD:ProductV|null=null;
    producId:number=0;

    ViewDetails(pro:any){
      this.producId=pro.id;
      console.log("producId"+this.producId);
      this.displayProductDialog=true;
      this.api.url = ` http://localhost:5250/api/ProductVariants/`+pro.id;
      this.api.getAll().subscribe({
        next: (data: ProductV) => {  
          this.productVD = data; 
          console.log("Filtered productVD ", this.productVD);
          this.vimage=[]
      this.api.url='http://localhost:5250/api/ProductImage/'+this.productVD?.id;
      this.api.getAll().subscribe({
        next: (data: image[]) => {  
          this.vimage = data; 
          console.log("Filtered vimage ", this.vimage);
        },
        error: err => {
          console.log('Error fetching  vimage:', err);
        }
      });
        },
        error: err => {
          console.log('Error fetching  productVD:', err);
        }
      });

    }
    showedit: boolean = false;
    prov: ProductV | null = null;

    editproductv(pro: ProductV) {
      this.showEditForm = true;
      this.showAddForm = false;
      this.showImageForm = false;
      console.log("Product to edit:", pro);  // Log the product to confirm data
  
      if (pro) {
        this.prov = pro;  // Assign the product to `prov`
        this.showedit = true;  // Set `showedit` to true to display the form
        console.log("Show edit flag:", this.showedit);
        // Trigger manual change detection to update the UI
        this.cdr.detectChanges();
      } else {
        console.log("Received a null or undefined product for editing.");
      }
    }
  
    onsubmitEdit() {
      if (this.prov) {
        this.api.url = `http://localhost:5250/api/ProductVariants`;
        this.api.edit(this.prov).subscribe({
          next: (data: ProductV) => {
            console.log("Edit successful", data);
            this.showedit = false;  // Hide the form after successful edit
          },
          error: (err) => {
            console.log('Error during edit:', err);
          }
        });
      }
    }
    
    confirmDeleteproductv(pro: ProductV) {
      // استخدام confirm لإظهار رسالة تأكيد للمستخدم
      const confirmed = confirm('Are you sure you want to delete this product variant?');
    
      if (confirmed) {
        this.api.url = 'http://localhost:5250/api/ProductVariants';
    
        this.api.delete(pro.id).subscribe({
          next: (data: any) => {  
            console.log("Product variant deleted successfully:", data);
            this.modalMessage = data.message; // تعيين الرسالة المستلمة
            this.showModal = true; // إظهار الـ modal
            
            // يمكنك استدعاء دالة لتحديث قائمة المنتجات أو المتغيرات إذا لزم الأمر
            // this.loadProductImages();
          },
          error: err => {
            console.log('Error deleting product variant:', err);
            this.modalMessage = 'Error deleting product variant.'; // تعيين رسالة الخطأ
            this.showModal = true; // إظهار الـ modal
          }
        });
      } else {
        console.log('Deletion cancelled by user.'); // إلغاء الحذف
      }
    }
    
  closeEditForm() {
    this.showEditForm = false;
  }
  closeAddForm() {
    this.showAddForm = false;
  }
  showModal: boolean = false;  // ضبط الحالة الأولية

  closeModal() {
    this.showModal = false;  // إغلاق النافذة المنبثقة
}
closeModal2(){
  this.displayProductDialog=false
}
  showform:boolean=false;
  addproductvariant(){
    this.showAddForm = true;
    this.showEditForm = false;
    this.showImageForm = false;
    this.showform=true;
    this.api.url = 'http://localhost:5250/api/ProductAdmin/colors';
    this.api.getAll().subscribe({
      next: (data: string[]) => {
        this.colors = data;
        console.log("Filtered Products Variant color", this.colors);
      },
      error: err => {
        console.log('Error fetching color:', err);
      }
    });  
    this.api.url = 'http://localhost:5250/api/ProductAdmin/material';
    this.api.getAll().subscribe({
      next: (data: string[]) => {
        this.material = data;
        console.log("Filtered Products Variant material", this.material);
      },
      error: err => {
        console.log('Error fetching material:', err);
      }
    });        
    console.log(this.catid+"catid");
    this.api.url='http://localhost:5250/api/Category/'+this.product?.categoryId
    this.api.getAll().subscribe({
      next: (data: MainCategory) => {
        this.cat = data;
        console.log("Category", this.cat);
        this.api.url='http://localhost:5250/api/Sizes/by-size-type/'+this.cat?.sizeTypeId;

        this.api.getAll().subscribe({
          next: (data: PSize[]) => {
            this.size = data;
            console.log("size", this.size);
          },
          error: err => {
            console.log('Error fetching size:', err);
          }
        }); 
      },
      error: err => {
        console.log('Error fetching Category:', err);
      }
    }); 
  }

   colors:string[]=[];

   material:string[]=[];
  
   size:PSize[]|null=null;
  
  // cat:MainCategory|null=null;
  
   colorselected:string='';
  
   materialselected:string='';
  
   sizeselected:string='';
  

   cat:MainCategory|null=null;

   modalMessage:string='';

   prouctvId:number=0;

  showimgefile:boolean=false;
  selectedFile: File | null = null;
  file: File | null = null;
addimage(pro: any) {
  this.showImageForm = true;
  this.showAddForm = false;
  this.showEditForm = false;
  this.showModal=false;

  this.prouctvId = pro.id;
  console.log(this.prouctvId+"prouctvId");
}
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0]; 
}

ImageAdd() {
  if (this.selectedFile) {
    this.api.url='http://localhost:5250'
    this.api.uploadImage(this.selectedFile, this.prouctvId).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
        this.showModal=true;
        this.modalMessage='Image uploaded successfully';
      },
      (error) => {
        console.log('Error uploading image:', error);
        this.showModal=true;
        this.modalMessage='Image uploaded successfully';
      }
    );
  }
}

   productvariant: ProductV = new ProductV(0,0,'','','',0,0,0,0,0,0,0,'');

   onSubmitVariant(variantForm: NgForm) {
    if (variantForm.invalid) {
        console.log("Form is invalid. Please check your input.");
        return; 
    }

    console.log(this.productId + " productId");
    console.log(this.productvariant + " productvariant");

    // تأكد من أن البيانات التي ترسلها تتطابق مع الهيكل المطلوب
    const vr = {
        id: 0,  
        productId: this.productId ,  
        price: this.productvariant.price || 0, 
        stockQuantity: this.productvariant.stockQuantity || 0, 
        productColor:  this.productvariant.productColor,  
        productMaterial:  this.productvariant.productMaterial,  
        sizeId: Number(this.productvariant.sizeId) || 0  
    };
    console.log('Data sent to API:', vr); 
    this.api.url = 'http://localhost:5250/api/ProductVariants';

    this.api.add2(vr).subscribe({
      next: (response) => {
          console.log('Variant created successfully:', response);

          this.modalMessage = 'Variant added successfully!';  // رسالة النجاح
          this.showModal = true;  // إظهار النافذة المنبثقة
          this.prouctvId=response.id;
      },
      error: (error) => {
          console.log('Error creating product:', error);
          this.modalMessage = error.error || 'Error adding variant.';  // رسالة الخطأ
          this.showModal = true;  // إظهار النافذة المنبثقة
      },
  });
  
}
}

